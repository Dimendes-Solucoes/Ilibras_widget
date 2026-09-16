/**
 * Gera os três formatos do widget a partir de uma fonte só (src/).
 *
 *   dist/ilibras-widget.mjs   ESM  — `import ILibrasWidget from 'ilibras-widget'`
 *   dist/ilibras-widget.cjs   CJS  — `require('ilibras-widget')`
 *   dist/ilibras-widget.js    IIFE — <script src>, e é o que a CDN serve
 *   ilibras-widget.js (raiz)  cópia do IIFE
 *
 * A cópia na raiz não é capricho: os sites já instalados apontam para esse
 * caminho, e o README manda baixar o arquivo de lá. Mudar o endereço quebraria
 * quem não vai atualizar tão cedo — que é justamente o público de WordPress
 * que não usa npm.
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const versao = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8')).version;

const banner = [
    '/*!',
    ' * iLibras Widget v' + versao,
    ' * https://github.com/Dimendes-Solucoes/Ilibras_widget',
    ' * Licença MIT',
    ' *',
    ' * ARQUIVO GERADO — não edite. A fonte está em src/.',
    ' */',
].join('\n');

const comum = {
    bundle: true,
    target: ['es2019'],
    charset: 'utf8',
    banner: { js: banner },
    logLevel: 'warning',
};

const saidas = [
    { entryPoints: ['src/index.js'], outfile: 'dist/ilibras-widget.mjs', format: 'esm' },
    { entryPoints: ['src/index.js'], outfile: 'dist/ilibras-widget.cjs', format: 'cjs' },
    { entryPoints: ['src/navegador.js'], outfile: 'dist/ilibras-widget.js', format: 'iife' },
];

for (const saida of saidas) {
    await build({ ...comum, ...saida, absWorkingDir: raiz });
}

// A raiz recebe a mesma build de <script>, no endereço de sempre.
fs.copyFileSync(
    path.join(raiz, 'dist', 'ilibras-widget.js'),
    path.join(raiz, 'ilibras-widget.js'),
);

const kb = (n) => (n / 1024).toFixed(1).padStart(5) + ' KB';
const medir = (arquivo) => {
    const bytes = fs.readFileSync(path.join(raiz, arquivo));
    return arquivo.padEnd(28) + kb(bytes.length) + '  |' + kb(zlib.gzipSync(bytes).length) + ' gzip';
};

console.log([
    medir('dist/ilibras-widget.mjs'),
    medir('dist/ilibras-widget.cjs'),
    medir('dist/ilibras-widget.js'),
    medir('ilibras-widget.js'),
].join('\n'));
