/**
 * Guarda o que mais provavelmente quebra num pacote embarcável: o widget
 * chegar ao site do cliente sem estilo ou sem logo.
 *
 * Antes de virar pacote, o widget se localizava procurando a própria
 * <script src> na página. Sob um bundler essa tag não existe, o caminho caía
 * na URL do site do cliente e o widget aparecia cru — sem erro no console que
 * explicasse por quê. Estes testes existem para isso não voltar em silêncio.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ler = (arquivo) => fs.readFileSync(new URL('../' + arquivo, import.meta.url), 'utf8');

const builds = [
    ['ESM (npm)', 'dist/ilibras-widget.mjs'],
    ['CJS (require)', 'dist/ilibras-widget.cjs'],
    ['IIFE (<script>)', 'dist/ilibras-widget.js'],
    ['raiz (sites já instalados)', 'ilibras-widget.js'],
];

for (const [nome, arquivo] of builds) {
    test(`${nome}: leva o estilo embutido`, () => {
        const codigo = ler(arquivo);
        assert.ok(
            codigo.includes('#ilibras-widget-container'),
            'o CSS não está dentro do arquivo',
        );
    });

    test(`${nome}: leva a logo embutida`, () => {
        const codigo = ler(arquivo);
        assert.ok(
            codigo.includes('data:image/svg+xml'),
            'a logo não está dentro do arquivo',
        );
    });

    test(`${nome}: não procura arquivo irmão`, () => {
        const codigo = ler(arquivo);
        assert.ok(
            !codigo.includes("'ilibras-widget.css'"),
            'ainda tenta carregar o CSS de um caminho relativo',
        );
        assert.ok(
            !codigo.includes("'ilibras-LOGO.svg'"),
            'ainda tenta carregar a logo de um caminho relativo',
        );
    });
}

test('ESM exporta a classe, e só isso', async () => {
    const modulo = await import('../dist/ilibras-widget.mjs');

    assert.equal(typeof modulo.default, 'function', 'falta o export default');
    assert.equal(typeof modulo.ILibrasWidget, 'function', 'falta o export nomeado');
    assert.equal(modulo.default, modulo.ILibrasWidget, 'os dois exports divergiram');
});

test('importar não cria widget nenhum', async () => {
    // Sem `document` neste processo: se o módulo tocasse o DOM ao ser
    // importado, o import acima já teria estourado. É o mesmo que acontece na
    // renderização no servidor de Next e Nuxt.
    assert.equal(typeof globalThis.document, 'undefined');
    await import('../dist/ilibras-widget.mjs');
});

test('a build de <script> continua expondo o global', () => {
    const codigo = ler('ilibras-widget.js');
    assert.ok(codigo.includes('window.ILibrasWidget'), 'o global sumiu');
    assert.ok(
        codigo.includes('iLibrasWidgetConfig'),
        'a instanciação automática sumiu — sites em WordPress dependem dela',
    );
});

test('o modo de agendamento sobreviveu ao empacotamento', () => {
    const codigo = ler('dist/ilibras-widget.mjs');
    assert.ok(codigo.includes('agendamento'), 'o modo de agendamento sumiu');
    assert.ok(codigo.includes('scheduleButtonText'), 'o texto do botão sumiu');
});
