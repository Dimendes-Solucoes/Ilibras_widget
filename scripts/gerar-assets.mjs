/**
 * Gera src/assets-gerados.js a partir do CSS e da logo.
 *
 * Existe porque o pacote precisa funcionar sem arquivo ao lado: quem instala
 * pelo npm não tem uma <script src> na página para o widget se localizar, e o
 * caminho relativo cairia na URL do site do cliente. Embutido, não há caminho
 * para errar.
 *
 * A fonte continua sendo `ilibras-widget.css` e `ilibras-LOGO.svg` na raiz —
 * editar o estilo aqui é editar o arquivo de sempre, não uma cópia.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ler = (arquivo) => fs.readFileSync(path.join(raiz, arquivo), 'utf8');

const CR = String.fromCharCode(13);

// O CSS é CRLF no repositório, e cada retorno de carro vira um byte a mais
// dentro da string embutida sem servir para nada no navegador.
const css = ler('ilibras-widget.css').split(CR).join('');
const svg = ler('ilibras-LOGO.svg');

/**
 * Data URI de SVG com codificação mínima: escapa só o que quebraria o atributo
 * HTML ou a própria URI. Base64 custaria 3,3 KB gzip a mais para desenhar o
 * mesmo ícone — num widget que carrega na primeira visita, isso se paga.
 *
 * As aspas viram simples porque o `src` do <img> é montado com aspas duplas, e
 * o `&` é escapado porque o escapar() do widget o transformaria em `&amp;`
 * dentro da URI.
 */
function dataUri(svgTexto) {
    const corpo = svgTexto
        .replace(/%/g, '%25')
        .replace(/&/g, '%26')
        .replace(/#/g, '%23')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/"/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

    return 'data:image/svg+xml,' + corpo;
}

const logo = dataUri(svg);

const conteudo = [
    '/**',
    ' * ARQUIVO GERADO — não edite.',
    ' *',
    ' * Sai de `npm run gerar-assets`, a partir de ilibras-widget.css e',
    ' * ilibras-LOGO.svg na raiz do repositório. Para mudar o estilo ou a logo,',
    ' * mexa neles e rode o build.',
    ' */',
    '',
    'export const CSS = ' + JSON.stringify(css) + ';',
    '',
    'export const LOGO = ' + JSON.stringify(logo) + ';',
    '',
].join('\n');

fs.writeFileSync(path.join(raiz, 'src', 'assets-gerados.js'), conteudo);

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log('src/assets-gerados.js  css ' + kb(css.length) + '  logo ' + kb(logo.length));
