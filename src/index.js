/**
 * Entrada do pacote npm.
 *
 * Só reexporta: importar não pode criar widget nenhum. Quem instala pelo npm
 * decide quando e onde instanciar — e, num projeto com renderização no
 * servidor, o import acontece onde não existe `document`.
 */
export { ILibrasWidget, FalhaDeServico } from './ILibrasWidget.js';
export { default } from './ILibrasWidget.js';
