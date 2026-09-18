/**
 * Uma aba, não duas.
 *
 * O widget abria a aba nova com `window.open(destino, '_blank', 'noopener')` e
 * caía na aba atual quando o retorno era falso, para não perder o atendimento
 * já criado num pop-up bloqueado. Só que a especificação manda `window.open`
 * devolver `null` sempre que `noopener` está presente — **mesmo quando a aba
 * abre**. O teste do retorno lia isso como bloqueio e navegava a aba atual
 * junto: a pessoa ficava com duas.
 *
 * Estes testes fixam as duas metades do conserto: nada de `noopener` na
 * chamada, e a navegação da aba atual só no ramo em que a aba não abriu.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ler = (arquivo) => fs.readFileSync(new URL('../' + arquivo, import.meta.url), 'utf8');

const builds = [
    ['ESM (npm)', 'dist/ilibras-widget.mjs'],
    ['IIFE (<script>)', 'dist/ilibras-widget.js'],
    ['raiz (sites já instalados)', 'ilibras-widget.js'],
];

for (const [nome, arquivo] of builds) {
    test(`${nome}: não passa 'noopener' para window.open`, () => {
        const codigo = ler(arquivo);
        assert.ok(
            !/window\.open\([^)]*noopener/.test(codigo),
            "'noopener' voltou: window.open passaria a devolver null sempre e a aba atual navegaria junto",
        );
    });

    test(`${nome}: abre a aba nova`, () => {
        assert.ok(/window\.open\([^)]*_blank/.test(ler(arquivo)), 'deixou de abrir em aba nova');
    });

    test(`${nome}: protege o opener da aba aberta`, () => {
        // Sem a feature 'noopener', a proteção passa a ser anular na mão.
        assert.ok(/\.opener\s*=\s*null/.test(ler(arquivo)), 'a aba nova ficou com referência ao site de origem');
    });

    test(`${nome}: só navega a aba atual quando a nova não abriu`, () => {
        const codigo = ler(arquivo);
        assert.ok(codigo.includes('location.assign'), 'o plano B para pop-up bloqueado sumiu');

        // A navegação da aba atual tem de estar num ramo negativo — nunca solta
        // logo depois do open, que é o que produzia as duas abas.
        const solta = /window\.open\([^)]*\);\s*(?:\/\/[^\n]*\n\s*)*window\.location\.assign/;
        assert.ok(!solta.test(codigo), 'a aba atual navega sem checar se a nova abriu');
    });
}
