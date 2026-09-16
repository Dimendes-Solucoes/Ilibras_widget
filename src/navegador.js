/**
 * Entrada da build para <script src>.
 *
 * É o que mantém funcionando o site em WordPress e o HTML solto, que não têm
 * npm em lugar nenhum: expõe `window.ILibrasWidget` e cria o widget sozinho
 * quando existe `window.iLibrasWidgetConfig` — exatamente o que o arquivo
 * fazia antes de virar pacote.
 */
import ILibrasWidget from './ILibrasWidget.js';

window.ILibrasWidget = ILibrasWidget;

if (window.iLibrasWidgetConfig) {
    window.iLibrasWidgetInstance = new ILibrasWidget(window.iLibrasWidgetConfig);
}
