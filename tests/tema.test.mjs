/**
 * O widget acompanha o tema do site (v1.7.0).
 *
 * O ícone flutua sobre a página, então quem decide a cor dele é o fundo do
 * site, não o sistema. Estes testes fixam as promessas que importam:
 *
 * - num site escuro o ícone fica branco, e só o azul muda — o dourado fica;
 * - num site claro aberto num computador em modo escuro, o ícone continua
 *   azul: branco ali seria branco sobre branco;
 * - o site que segue o sistema sem pintar fundo nenhum (só color-scheme) é
 *   lido pela tela-base do navegador;
 * - a config fixa o tema quando o fundo não dá para ler;
 * - a troca de tema do site é percebida sem recarregar, e destroy() para de
 *   observar.
 *
 * Rodam contra a build publicada no npm, com DOM e canvas simulados. O canvas
 * de verdade, com oklch() e companhia, só existe no navegador.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ILibrasWidget } from '../dist/ilibras-widget.mjs';

const AZUL = '%231c2c4c';
const BRANCO = '%23ffffff';
const DOURADO = '%23d3c38c';

const ESCURO = 'ilibras-widget-tema-escuro';

/** O que o navegador diria sobre a página. Cada teste ajusta o que precisa. */
let pagina;
let observadores;
let quadros;
let ouvintes;

/** '#rrggbb', 'rgb()', 'rgba()' e 'transparent'. O resto o canvas ignora. */
function lerCor(cor) {
    if (cor === 'transparent') return [0, 0, 0, 0];
    let m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(cor);
    if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16), 255];
    m = /^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)$/.exec(cor);
    if (m) return [+m[1], +m[2], +m[3], Math.round((m[4] === undefined ? 1 : +m[4]) * 255)];
    return undefined;
}

/** Canvas de 1 pixel que compõe por cima, como o de verdade. */
function canvasFalso() {
    let pixel = [0, 0, 0, 0];
    let tinta = [0, 0, 0, 255];
    const ctx = {
        set fillStyle(cor) {
            const rgba = lerCor(cor);
            if (rgba) tinta = rgba;
        },
        fillRect() {
            const a = tinta[3] / 255;
            const fundo = pixel;
            pixel = [0, 1, 2].map((i) => Math.round(tinta[i] * a + fundo[i] * (1 - a)));
            pixel.push(Math.max(tinta[3], fundo[3]));
        },
        getImageData() {
            // Proteção contra fingerprint: devolve pixel vazio no lugar do real.
            return { data: pagina.canvasBloqueado ? [0, 0, 0, 0] : pixel };
        },
    };
    return { width: 0, height: 0, getContext: () => ctx };
}

function alvoDeEventos() {
    return {
        addEventListener(tipo, fn) { ouvintes.push([this, tipo, fn]); },
        removeEventListener(tipo, fn) {
            ouvintes = ouvintes.filter(([alvo, t, f]) => !(alvo === this && t === tipo && f === fn));
        },
    };
}

beforeEach(() => {
    pagina = {
        fundoHtml: 'rgba(0, 0, 0, 0)',
        fundoBody: 'rgba(0, 0, 0, 0)',
        colorScheme: 'normal',
        meta: null,
        sistemaEscuro: false,
        canvasBloqueado: false,
    };
    observadores = [];
    quadros = [];
    ouvintes = [];

    const preferencia = { ...alvoDeEventos() };
    Object.defineProperty(preferencia, 'matches', { get: () => pagina.sistemaEscuro });

    globalThis.window = {
        ...alvoDeEventos(),
        matchMedia: () => preferencia,
    };

    const html = { nome: 'html' };
    const body = { nome: 'body' };
    globalThis.document = {
        ...alvoDeEventos(),
        documentElement: html,
        body,
        createElement: () => canvasFalso(),
        querySelector: (seletor) => (
            seletor === 'meta[name="color-scheme"]' && pagina.meta !== null ? { content: pagina.meta } : null
        ),
        getElementById: () => null,
    };

    globalThis.getComputedStyle = (el) => ({
        backgroundColor: el === html ? pagina.fundoHtml : pagina.fundoBody,
        colorScheme: el === html ? pagina.colorScheme : 'normal',
    });

    globalThis.MutationObserver = class {
        constructor(fn) { this.fn = fn; this.alvos = []; this.desligado = false; observadores.push(this); }
        observe(alvo) { this.alvos.push(alvo); }
        disconnect() { this.desligado = true; }
    };
    globalThis.requestAnimationFrame = (fn) => { quadros.push(fn); return quadros.length; };
    globalThis.cancelAnimationFrame = () => {};
});

/** Roda os quadros pendentes, como o navegador faria no próximo frame. */
function proximoQuadro() {
    const pendentes = quadros;
    quadros = [];
    for (const fn of pendentes) fn();
}

function montarWidget(config = {}) {
    const w = Object.create(ILibrasWidget.prototype);
    w.config = { tema: 'auto', ...config };
    w.container = {
        classes: new Set(),
        classList: {
            toggle(c, ligar) { if (ligar) w.container.classes.add(c); else w.container.classes.delete(c); },
        },
        remove() { this.removido = true; },
    };
    w.logo = { src: '' };
    return w;
}

const escuro = (w) => w.container.classes.has(ESCURO);

test('num site escuro o ícone fica branco, e o dourado continua', () => {
    pagina.fundoBody = 'rgb(18, 18, 18)';
    const w = montarWidget();

    w.aplicarTema();

    assert.ok(escuro(w), 'o tema escuro não ligou');
    assert.ok(w.logo.src.startsWith('data:image/svg+xml'), 'a logo deixou de ser a embutida');
    assert.ok(w.logo.src.includes(BRANCO), 'o ícone não ficou branco');
    assert.ok(!w.logo.src.includes(AZUL), 'sobrou azul no ícone');
    assert.ok(w.logo.src.includes(DOURADO), 'o dourado da logo sumiu');
});

test('num site claro o ícone continua azul', () => {
    pagina.fundoBody = 'rgb(255, 255, 255)';
    const w = montarWidget();

    w.aplicarTema();

    assert.ok(!escuro(w));
    assert.ok(w.logo.src.includes(AZUL), 'o ícone perdeu o azul');
    assert.ok(!w.logo.src.includes(BRANCO));
});

test('site claro num computador em modo escuro: o ícone continua azul', () => {
    // O caso que o prefers-color-scheme sozinho erraria: branco sobre branco.
    pagina.fundoBody = 'rgb(255, 255, 255)';
    pagina.sistemaEscuro = true;
    const w = montarWidget();

    w.aplicarTema();

    assert.ok(!escuro(w), 'o sistema escuro pintou o ícone de branco num site branco');
    assert.ok(w.logo.src.includes(AZUL));
});

test('site sem fundo próprio e sem color-scheme mostra a tela branca, mesmo com o sistema escuro', () => {
    pagina.sistemaEscuro = true;
    const w = montarWidget();

    assert.equal(w.detectarTema(), 'claro');
});

test('site que só declara color-scheme acompanha o sistema', () => {
    const w = montarWidget();
    pagina.colorScheme = 'light dark';

    pagina.sistemaEscuro = true;
    assert.equal(w.detectarTema(), 'escuro', 'a tela-base escura do navegador não foi lida');

    pagina.sistemaEscuro = false;
    assert.equal(w.detectarTema(), 'claro');
});

test('color-scheme só escuro é escuro mesmo com o sistema claro', () => {
    pagina.colorScheme = 'dark';
    assert.equal(montarWidget().detectarTema(), 'escuro');
});

test('a <meta name="color-scheme"> vale quando o CSS não declara nada', () => {
    pagina.meta = 'light dark';
    pagina.sistemaEscuro = true;
    assert.equal(montarWidget().detectarTema(), 'escuro');
});

test('o fundo do body fica por cima do fundo do html', () => {
    pagina.fundoHtml = 'rgb(20, 20, 20)';
    pagina.fundoBody = 'rgb(250, 250, 250)';
    assert.equal(montarWidget().detectarTema(), 'claro');

    pagina.fundoBody = 'rgba(0, 0, 0, 0)';
    assert.equal(montarWidget().detectarTema(), 'escuro', 'o fundo do html foi ignorado');
});

test('fundo translúcido é misturado com o que está embaixo', () => {
    // Preto a 5% sobre branco é um cinza quase branco, não preto.
    pagina.fundoHtml = 'rgb(255, 255, 255)';
    pagina.fundoBody = 'rgba(0, 0, 0, 0.05)';
    assert.equal(montarWidget().detectarTema(), 'claro');
});

test('o limite fica onde o branco passa a contrastar mais que o azul', () => {
    const casos = [
        ['rgb(31, 41, 55)', 'escuro'],    // cinza-azulado de tema escuro
        ['rgb(119, 119, 119)', 'escuro'], // cinza médio: o branco ainda ganha
        ['rgb(153, 153, 153)', 'claro'],  // cinza claro: o azul já ganha
        ['rgb(74, 144, 226)', 'claro'],   // o azul do próprio iLibras
        ['rgb(243, 244, 246)', 'claro'],
    ];
    for (const [cor, esperado] of casos) {
        pagina.fundoBody = cor;
        assert.equal(montarWidget().detectarTema(), esperado, cor);
    }
});

test('canvas bloqueado pela proteção contra fingerprint cai no claro', () => {
    // Pixel vazio seria lido como preto, e o ícone branco sumiria num site branco.
    pagina.fundoBody = 'rgb(255, 255, 255)';
    pagina.canvasBloqueado = true;
    assert.equal(montarWidget().detectarTema(), 'claro');
});

test('tema: "escuro" e "claro" fixam o tema, seja qual for o fundo', () => {
    pagina.fundoBody = 'rgb(255, 255, 255)';
    const forcadoEscuro = montarWidget({ tema: 'escuro' });
    forcadoEscuro.aplicarTema();
    assert.ok(escuro(forcadoEscuro));
    assert.ok(forcadoEscuro.logo.src.includes(BRANCO));

    pagina.fundoBody = 'rgb(0, 0, 0)';
    const forcadoClaro = montarWidget({ tema: 'claro' });
    forcadoClaro.aplicarTema();
    assert.ok(!escuro(forcadoClaro));
    assert.ok(forcadoClaro.logo.src.includes(AZUL));
});

test('valor desconhecido em tema vale como "auto"', () => {
    pagina.fundoBody = 'rgb(0, 0, 0)';
    assert.equal(montarWidget({ tema: 'dark-mode' }).detectarTema(), 'escuro');
});

test('definirTema troca na hora, e "auto" volta a ler o site', () => {
    pagina.fundoBody = 'rgb(255, 255, 255)';
    const w = montarWidget();
    w.aplicarTema();

    w.definirTema('escuro');
    assert.ok(escuro(w), 'definirTema("escuro") não ligou o tema');

    w.definirTema('auto');
    assert.ok(!escuro(w), '"auto" não voltou a seguir o fundo claro do site');
});

test('trocar a classe do site relê o tema no quadro seguinte', () => {
    pagina.fundoBody = 'rgb(255, 255, 255)';
    const w = montarWidget();
    w.observarTema();
    assert.ok(!escuro(w));

    const [observador] = observadores;
    assert.deepEqual(observador.alvos, [document.documentElement, document.body]);

    // O botão de tema do site põe .dark no <html>, e o CSS dele escurece o body.
    pagina.fundoBody = 'rgb(17, 24, 39)';
    observador.fn([]);
    observador.fn([]); // duas mutações seguidas: uma leitura só
    assert.equal(quadros.length, 1, 'cada mutação agendou uma leitura');

    proximoQuadro();
    assert.ok(escuro(w), 'a troca de tema do site não foi percebida');
    assert.ok(w.logo.src.includes(BRANCO));
});

test('o sistema trocando de modo relê o tema', () => {
    pagina.colorScheme = 'light dark';
    const w = montarWidget();
    w.observarTema();
    assert.ok(!escuro(w));

    const mudanca = ouvintes.find(([, tipo]) => tipo === 'change');
    assert.ok(mudanca, 'ninguém ouve a troca de modo do sistema');

    pagina.sistemaEscuro = true;
    mudanca[2]();
    proximoQuadro();
    assert.ok(escuro(w));
});

test('destroy para de observar o site', () => {
    const w = montarWidget();
    w.observarTema();
    assert.ok(ouvintes.length > 0);

    w.destroy();

    assert.ok(observadores[0].desligado, 'o MutationObserver continuou ligado');
    assert.deepEqual(ouvintes, [], 'sobraram ouvintes na página: ' + ouvintes.map(([, t]) => t).join(', '));
});

const builds = [
    ['ESM (npm)', 'dist/ilibras-widget.mjs'],
    ['IIFE (<script>)', 'dist/ilibras-widget.js'],
    ['raiz (sites já instalados)', 'ilibras-widget.js'],
];

for (const [nome, arquivo] of builds) {
    test(`${nome}: o tema escuro do CSS segue a classe, não o sistema`, () => {
        const codigo = fs.readFileSync(new URL('../' + arquivo, import.meta.url), 'utf8');
        // Uma regra de prefers-color-scheme pintaria o widget pelo sistema e
        // o deixaria discordando do ícone, que segue o site.
        assert.ok(!/@media\s*\(prefers-color-scheme/.test(codigo), 'voltou regra de prefers-color-scheme no CSS');
        assert.ok(codigo.includes('#ilibras-widget-container.ilibras-widget-tema-escuro'), 'o tema escuro sumiu do CSS');
    });
}
