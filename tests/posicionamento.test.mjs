/**
 * O widget fica no canto, dentro da tela.
 *
 * A v1.5.1 escopou o estilo ao container para o tema do site não pintar o
 * widget — e escopou demais. As classes de posição
 * (`.ilibras-widget-bottom-right` e irmãs) ficam no PRÓPRIO container, não num
 * descendente dele; viraram `#ilibras-widget-container .ilibras-widget-...`,
 * com espaço, que não casa com nada. O container perdeu `bottom`/`right`,
 * ficou na posição estática de um elemento no fim do body e foi parar a
 * milhares de pixels da tela — invisível num site em produção.
 *
 * Estes testes olham a forma do seletor, que é onde o erro mora: composto para
 * o que é do container, descendente para o resto.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ler = (arquivo) => fs.readFileSync(new URL('../' + arquivo, import.meta.url), 'utf8');

const POSICOES = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];

const builds = [
    ['ESM (npm)', 'dist/ilibras-widget.mjs'],
    ['IIFE (<script>)', 'dist/ilibras-widget.js'],
    ['raiz (sites já instalados)', 'ilibras-widget.js'],
];

for (const [nome, arquivo] of builds) {
    for (const pos of POSICOES) {
        test(`${nome}: .ilibras-widget-${pos} é escopada no próprio container`, () => {
            const codigo = ler(arquivo);
            const classe = `.ilibras-widget-${pos}`;

            assert.ok(
                codigo.includes(`#ilibras-widget-container${classe}`),
                `${classe} perdeu o escopo composto: o widget não recebe bottom/right e sai da tela`,
            );

            assert.ok(
                !codigo.includes(`#ilibras-widget-container ${classe}`),
                `${classe} virou seletor de descendente, e a classe está no próprio container`,
            );
        });
    }

    test(`${nome}: as regras de posição continuam existindo`, () => {
        const codigo = ler(arquivo);
        // Sem elas o container é `fixed` sem âncora e fica onde o fluxo largou.
        assert.ok(codigo.includes('bottom: 30px'), 'o encosto de baixo sumiu');
        assert.ok(codigo.includes('right: 30px'), 'o encosto da direita sumiu');
    });

    test(`${nome}: nenhuma regra do widget ficou sem escopo`, () => {
        const css = ler(arquivo);
        // Uma classe do widget logo depois de `{` ou `}` no CSS embutido é regra
        // solta — e regra solta é o tema do cliente mandando no visual.
        const soltas = css.match(/[{}]\s*\.ilibras-widget-[a-z-]+\s*[,{]/g) || [];
        assert.deepEqual(soltas, [], 'regras fora do escopo: ' + soltas.join(' '));
    });

    test(`${nome}: o escopo não vazou para fora do widget`, () => {
        // O container e seus filhos, e nada além: o botão do site do cliente
        // continua com o visual do site.
        const css = ler(arquivo);
        assert.ok(!/(^|[^-\w])body\s*\{/.test(css), 'o widget passou a estilizar o body do cliente');
    });
}
