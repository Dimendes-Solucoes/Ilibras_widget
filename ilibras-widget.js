/*!
 * iLibras Widget v1.5.1
 * https://github.com/Dimendes-Solucoes/Ilibras_widget
 * Licença MIT
 *
 * ARQUIVO GERADO — não edite. A fonte está em src/.
 */
(() => {
  // src/assets-gerados.js
  var CSS = `/**
 * iLibras Widget - Estilos
 * @version 1.0.0
 */

/* Reset e configurações base */
#ilibras-widget-container * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}

/* Container principal */
#ilibras-widget-container {
  position: fixed;
  z-index: 9999;
}

/* Posicionamento */
#ilibras-widget-container .ilibras-widget-bottom-right {
  bottom: 30px;
  right: 30px;
}

#ilibras-widget-container .ilibras-widget-bottom-left {
  bottom: 30px;
  left: 30px;
}

#ilibras-widget-container .ilibras-widget-top-right {
  top: 30px;
  right: 30px;
}

#ilibras-widget-container .ilibras-widget-top-left {
  top: 30px;
  left: 30px;
}

/* Botão flutuante (apenas ícone) */
#ilibras-widget-container .ilibras-widget-button {
  position: relative;
  border: none;
  font: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  /* ajustar ao tamanho do próprio ícone */
  width: auto;
  height: auto;
  background: transparent; /* sem cor de fundo */
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: none;
  transition: none;
  padding: 0;
  z-index: 10001;
}

#ilibras-widget-container .ilibras-widget-button img {
  width: 64px;
  height: 64px;
}

.ilibras-widget-button:hover,
#ilibras-widget-container .ilibras-widget-button:active {
  transform: none;
  box-shadow: none;
}

#ilibras-widget-container .ilibras-widget-button svg {
  filter: none;
}

/* Badge de notificação */
#ilibras-widget-container .ilibras-widget-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #FF3B30;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  animation: ilibras-pulse 2s infinite;
}

@keyframes ilibras-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Modal */
#ilibras-widget-container .ilibras-widget-modal {
  position: fixed;
  /* responsivo ao tamanho do monitor */
  width: clamp(320px, 26vw, 480px);
  max-width: calc(100vw - 40px);
  background: white;
  border: 1px solid rgba(53, 122, 189, 0.08);
  border-radius: 8px; /* mais achatado */
  box-shadow: 0 6px 18px rgba(20, 30, 45, 0.06);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px) scale(0.995);
  transition: opacity 240ms ease, transform 240ms cubic-bezier(0.2,0,0,1);
  z-index: 10000;
  overflow: hidden;
}

#ilibras-widget-container .ilibras-widget-modal-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Posicionamento do modal baseado na posição do botão */
.ilibras-widget-bottom-right .ilibras-widget-modal,
#ilibras-widget-container .ilibras-widget-bottom-left .ilibras-widget-modal {
  bottom: 105px;
}

.ilibras-widget-top-right .ilibras-widget-modal,
#ilibras-widget-container .ilibras-widget-top-left .ilibras-widget-modal {
  top: 105px;
}

.ilibras-widget-bottom-right .ilibras-widget-modal,
#ilibras-widget-container .ilibras-widget-top-right .ilibras-widget-modal {
  right: 0;
}

.ilibras-widget-bottom-left .ilibras-widget-modal,
#ilibras-widget-container .ilibras-widget-top-left .ilibras-widget-modal {
  left: 0;
}

#ilibras-widget-container .ilibras-widget-header {
  background: white;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #357ABD;
  border-left: 2px solid rgba(53,122,189,0.08);
  border-bottom: 2px solid rgba(53,122,189,0.06);
}

#ilibras-widget-container .ilibras-widget-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

#ilibras-widget-container .ilibras-widget-logo {
  display: none !important;
}

#ilibras-widget-container .ilibras-widget-title {
  padding-left: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #1f4f7a;
}

#ilibras-widget-container .ilibras-widget-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.18s, transform 0.12s;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

#ilibras-widget-container .ilibras-widget-close:hover {
  background: rgba(53,122,189,0.08);
  transform: translateY(-1px);
}

#ilibras-widget-container .ilibras-widget-close:active {
  background: rgba(53,122,189,0.12);
}

/* Body do modal */
#ilibras-widget-container .ilibras-widget-body {
  padding: 20px !important;
  background: white; /* fundo branco do widget */
}

#ilibras-widget-container .ilibras-widget-message {
  background: rgba(74,144,226,0.06); /* leve tom da cor da logo */
  border-radius: 14px; 
  border: 1px solid rgba(74,144,226,0.08);
  font-size: 15px;
  margin-bottom: 18px !important;
  padding: 12px 14px;
  color: #073657;
}

/* Formulário */
#ilibras-widget-container .ilibras-widget-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#ilibras-widget-container .ilibras-widget-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#ilibras-widget-container .ilibras-widget-form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #495057;
  padding-left: 4px;
}

.ilibras-widget-form-group input[type="text"],
#ilibras-widget-container .ilibras-widget-form-group input[type="tel"] {
  background: #ffffff;
  border: 1px solid rgba(20,30,45,0.06);
  padding: 12px 14px !important;
  font-size: 15px;
  border-radius: 8px;
}

.ilibras-widget-form-group input[type="text"]:focus,
#ilibras-widget-container .ilibras-widget-form-group input[type="tel"]:focus {
  background: white;
  border-color: #357ABD;
  box-shadow: 0 6px 18px rgba(53,122,189,0.08);
  outline: none;
}

.ilibras-widget-form-group input[type="text"]::placeholder,
#ilibras-widget-container .ilibras-widget-form-group input[type="tel"]::placeholder {
  color: #6c757d;
}

/* Checkbox customizado */
#ilibras-widget-container .ilibras-widget-checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  padding: 8px 4px;
  font-size: 13px;
  color: #495057;
  line-height: 1.4;
}

#ilibras-widget-container .ilibras-widget-checkbox-label input[type="checkbox"] {
  margin-top: 2px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #357ABD;
}

#ilibras-widget-container .ilibras-widget-checkbox-label span {
  flex: 1;
}

/* Botão de submit */

#ilibras-widget-container .ilibras-widget-submit {
  padding: 12px 14px !important;
  border-radius: 10px;
  font-size: 15px;
  text-transform: none;
  letter-spacing: 0.3px;
  background: linear-gradient(90deg,#4A90E2,#357ABD);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.14s ease, opacity 0.12s;
}

#ilibras-widget-container .ilibras-widget-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(53,122,189,0.18);
}

#ilibras-widget-container .ilibras-widget-submit:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(53,122,189,0.12);
}

#ilibras-widget-container .ilibras-widget-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Agendar é a segunda escolha, não a concorrente: contorno em vez de preenchido,
   para a hierarquia entre "agora" e "depois" ficar visível antes da leitura. O
   form tem gap de 20px; as margens negativas colam o botão na dica que o explica. */
#ilibras-widget-container .ilibras-widget-agendar {
  padding: 11px 14px !important;
  border-radius: 10px;
  font-size: 15px;
  text-transform: none;
  letter-spacing: 0.3px;
  background: transparent;
  color: #357ABD;
  border: 1px solid #A9C7E8;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease, opacity 0.12s;
  margin-top: -8px;
}

#ilibras-widget-container .ilibras-widget-agendar:hover:not(:disabled) {
  background: #F2F7FD;
  border-color: #357ABD;
}

#ilibras-widget-container .ilibras-widget-agendar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

#ilibras-widget-container .ilibras-widget-dica-agendar {
  margin-top: -14px;
  text-align: center;
}

/* Responsividade */
@media (max-width: 480px) {
  #ilibras-widget-container .ilibras-widget-modal {
    width: calc(100vw - 40px);
    max-width: 100%;
  }

  .ilibras-widget-bottom-right,
  #ilibras-widget-container .ilibras-widget-bottom-left {
    bottom: 20px;
    left: 20px !important;
    right: 20px !important;
  }

  .ilibras-widget-top-right,
  #ilibras-widget-container .ilibras-widget-top-left {
    top: 20px;
    left: 20px !important;
    right: 20px !important;
  }

  #ilibras-widget-container .ilibras-widget-button {
    width: 64px;
    height: 64px;
  }

  #ilibras-widget-container .ilibras-widget-button svg {
    width: 32px;
    height: 32px;
  }

  #ilibras-widget-container .ilibras-widget-modal {
    bottom: 94px !important;
    right: 0 !important;
    left: 0 !important;
    margin: 0 20px;
  }

  #ilibras-widget-container .ilibras-widget-body {
    padding: 18px 16px;
  }
}

@media (min-width: 1600px) {
  #ilibras-widget-container .ilibras-widget-modal {
    width: clamp(360px, 20vw, 560px);
  }
}

.ilibras-widget-button:focus-visible,
.ilibras-widget-close:focus-visible,
#ilibras-widget-container .ilibras-widget-submit:focus-visible {
  outline: 3px solid rgba(53,122,189,0.18);
  outline-offset: 3px;
}

/* Animação de entrada */
@keyframes ilibras-slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#ilibras-widget-container {
  animation: ilibras-slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Estados de erro: ver o bloco de acessibilidade no fim do arquivo. */

/* Accessibilidade */
.ilibras-widget-button:focus-visible,
.ilibras-widget-close:focus-visible,
#ilibras-widget-container .ilibras-widget-submit:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* Tema escuro (opcional) */
@media (prefers-color-scheme: dark) {
  #ilibras-widget-container .ilibras-widget-modal {
    background: #1e1e1e;
  }

  #ilibras-widget-container .ilibras-widget-body {
    background: #2d2d2d;
  }

  #ilibras-widget-container .ilibras-widget-message {
    background: #363636;
    color: #e0e0e0;
  }

  #ilibras-widget-container .ilibras-widget-form-group label {
    color: #b0b0b0;
  }

  .ilibras-widget-form-group input[type="text"],
  #ilibras-widget-container .ilibras-widget-form-group input[type="tel"] {
    background: #363636;
    border-color: #4a4a4a;
    color: #e0e0e0;
  }

  .ilibras-widget-form-group input[type="text"]::placeholder,
  #ilibras-widget-container .ilibras-widget-form-group input[type="tel"]::placeholder {
    color: #6c6c6c;
  }

  #ilibras-widget-container .ilibras-widget-checkbox-label {
    color: #b0b0b0;
  }
}


/* ─── Acessibilidade e estados ──────────────────────────────────────────────
   O público deste widget é surdo, e boa parte navega por teclado e leitor de
   tela. O que segue existe para isso: texto que só o leitor de tela lê, erro
   ligado ao campo que o causou, foco sempre visível e movimento opcional.
*/

/* Visível só para leitor de tela. Não usa display:none — o que some da tela
   dessa forma some também da leitura. */
#ilibras-widget-container .ilibras-widget-sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Armadilha do anti-robô: fora da tela e fora da leitura, mas presente no DOM
   (bot que ignora display:none continua encontrando e preenchendo). */
#ilibras-widget-container .ilibras-widget-hp {
  position: absolute !important;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* O diálogo fechado não pode receber foco: com hidden, nada dentro dele entra
   na ordem de tabulação. */
#ilibras-widget-container .ilibras-widget-modal[hidden] {
  display: none !important;
}

#ilibras-widget-container .ilibras-widget-legenda {
  font-size: 12px;
  color: #495057;
  margin: 0 0 -8px 4px;
}

#ilibras-widget-container .ilibras-widget-dica {
  font-size: 12px;
  color: #495057;
  padding-left: 4px;
}

#ilibras-widget-container .ilibras-widget-erro {
  font-size: 13px;
  font-weight: 500;
  color: #b02a37;
  padding-left: 4px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

/* A cor não pode ser o único sinal de erro: quem não distingue vermelho
   precisa do símbolo e do texto. */
#ilibras-widget-container .ilibras-widget-erro::before {
  content: "\\26A0";
  font-size: 13px;
  line-height: 1.3;
}

#ilibras-widget-container .ilibras-widget-erro[hidden] {
  display: none;
}

#ilibras-widget-container .ilibras-widget-form-group input.ilibras-widget-invalido {
  border-color: #b02a37;
  border-width: 2px;
}

/* Aviso de falha de serviço / limite de uso. */
#ilibras-widget-container .ilibras-widget-aviso {
  background: #fdf2f2;
  border: 1px solid #f0c2c2;
  border-left: 4px solid #b02a37;
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 16px;
  color: #6b1d24;
  font-size: 14px;
  line-height: 1.5;
}

#ilibras-widget-container .ilibras-widget-aviso[hidden] {
  display: none;
}

#ilibras-widget-container .ilibras-widget-aviso:focus-visible {
  outline: 3px solid #b02a37;
  outline-offset: 2px;
}

#ilibras-widget-container .ilibras-widget-aviso-texto {
  margin: 0;
}

/* Plano de contingência: aparece quando a API não responde. */
#ilibras-widget-container .ilibras-widget-fallback {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f0c2c2;
  font-size: 13px;
}

#ilibras-widget-container .ilibras-widget-fallback p {
  margin: 0 0 6px;
}

#ilibras-widget-container .ilibras-widget-fallback ul {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
}

#ilibras-widget-container .ilibras-widget-fallback li {
  margin: 2px 0;
}

#ilibras-widget-container .ilibras-widget-fallback a {
  color: #1f4f7a;
  font-weight: 600;
}

#ilibras-widget-container .ilibras-widget-status {
  font-size: 13px;
  color: #495057;
  margin: 0;
  min-height: 1em;
}

/* Foco visível em tudo que recebe foco, inclusive campos — o :focus original
   trocava a sombra, que some em alto contraste. */
.ilibras-widget-button:focus-visible,
.ilibras-widget-close:focus-visible,
.ilibras-widget-submit:focus-visible,
.ilibras-widget-form-group input:focus-visible,
.ilibras-widget-checkbox-label input:focus-visible,
#ilibras-widget-container .ilibras-widget-fallback a:focus-visible {
  outline: 3px solid #1f4f7a;
  outline-offset: 2px;
}

/* Windows em alto contraste remove cor de fundo e borda sutil: sem isto o
   campo e o botão ficam sem contorno. */
@media (forced-colors: active) {
  .ilibras-widget-modal,
  .ilibras-widget-form-group input,
  .ilibras-widget-submit,
  #ilibras-widget-container .ilibras-widget-aviso {
    border: 1px solid CanvasText;
  }

  .ilibras-widget-button:focus-visible,
  .ilibras-widget-close:focus-visible,
  .ilibras-widget-submit:focus-visible,
  #ilibras-widget-container .ilibras-widget-form-group input:focus-visible {
    outline: 3px solid Highlight;
  }
}

/* Quem pediu menos movimento no sistema não deve receber animação: para parte
   das pessoas com sensibilidade vestibular, isso causa mal-estar. */
@media (prefers-reduced-motion: reduce) {
  #ilibras-widget-container,
  .ilibras-widget-modal,
  .ilibras-widget-submit,
  .ilibras-widget-close,
  #ilibras-widget-container .ilibras-widget-badge {
    animation: none !important;
    transition: none !important;
  }

  .ilibras-widget-submit:hover,
  #ilibras-widget-container .ilibras-widget-close:hover {
    transform: none;
  }
}

@media (prefers-color-scheme: dark) {
  .ilibras-widget-legenda,
  .ilibras-widget-dica,
  #ilibras-widget-container .ilibras-widget-status {
    color: #c9c9c9;
  }

  #ilibras-widget-container .ilibras-widget-erro {
    color: #ff9aa2;
  }

  #ilibras-widget-container .ilibras-widget-form-group input.ilibras-widget-invalido {
    border-color: #ff9aa2;
  }

  #ilibras-widget-container .ilibras-widget-aviso {
    background: #3a2224;
    border-color: #6b3a3f;
    border-left-color: #ff9aa2;
    color: #ffd9dc;
  }

  #ilibras-widget-container .ilibras-widget-fallback {
    border-top-color: #6b3a3f;
  }

  #ilibras-widget-container .ilibras-widget-fallback a {
    color: #9ecbff;
  }

  #ilibras-widget-container .ilibras-widget-title {
    color: #e6f0f8;
  }

  #ilibras-widget-container .ilibras-widget-header {
    background: #1e1e1e;
    border-left-color: #333;
    border-bottom-color: #333;
  }

  #ilibras-widget-container .ilibras-widget-close {
    color: #e0e0e0;
  }
}
`;
  var LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='656' height='862' viewBox='0 0 656 862' version='1.1'%3E%3Cpath d='M 344.453 10.250 L 340.500 14.500 344.750 10.547 C 347.087 8.373, 349 6.460, 349 6.297 C 349 5.540, 348.129 6.298, 344.453 10.250 M 338.452 18.093 C 337.572 19.794, 337.030 21.363, 337.247 21.580 C 337.464 21.797, 338.390 20.406, 339.305 18.487 C 341.361 14.175, 340.649 13.845, 338.452 18.093 M 186.762 57.707 C 188.006 57.946, 189.806 57.937, 190.762 57.687 C 191.718 57.437, 190.700 57.241, 188.500 57.252 C 186.300 57.263, 185.518 57.468, 186.762 57.707 M 198.083 59.373 C 199.112 60.294, 205 62.999, 205 62.551 C 205 61.975, 199.456 59, 198.383 59 C 197.989 59, 197.854 59.168, 198.083 59.373 M 170.127 65.478 C 167.857 67.940, 166 70.265, 166 70.644 C 166 71.023, 166.148 71.146, 166.330 70.917 C 166.511 70.688, 168.593 68.362, 170.957 65.750 C 173.321 63.138, 175.030 61, 174.755 61 C 174.480 61, 172.397 63.015, 170.127 65.478 M 216.088 72.416 C 219.711 76.312, 223.933 81.412, 225.471 83.750 C 228.737 88.717, 229.925 89.421, 227.307 84.839 C 226.313 83.100, 221.900 77.999, 217.500 73.505 C 211.540 67.416, 211.180 67.138, 216.088 72.416 M 418.286 108.500 C 418.294 111.250, 418.488 112.256, 418.718 110.736 C 418.947 109.216, 418.941 106.966, 418.704 105.736 C 418.467 104.506, 418.279 105.750, 418.286 108.500 M 322.252 108.500 C 322.263 110.700, 322.468 111.482, 322.707 110.238 C 322.946 108.994, 322.937 107.194, 322.687 106.238 C 322.437 105.282, 322.241 106.300, 322.252 108.500 M 156.395 124.500 C 156.396 132.200, 156.553 135.218, 156.743 131.206 C 156.934 127.195, 156.932 120.895, 156.741 117.206 C 156.549 113.518, 156.393 116.800, 156.395 124.500 M 321.310 125.500 C 321.315 128.800, 321.502 130.029, 321.725 128.232 C 321.947 126.435, 321.943 123.735, 321.715 122.232 C 321.486 120.729, 321.304 122.200, 321.310 125.500 M 547.500 127 C 549.648 129.200, 551.631 131, 551.906 131 C 552.181 131, 550.648 129.200, 548.500 127 C 546.352 124.800, 544.369 123, 544.094 123 C 543.819 123, 545.352 124.800, 547.500 127 M 503.860 141.750 C 500.983 145.223, 499.765 147, 500.259 147 C 500.536 147, 501.964 145.425, 503.432 143.500 C 506.157 139.928, 506.487 138.579, 503.860 141.750 M 320.336 149 C 320.336 153.125, 320.513 154.813, 320.728 152.750 C 320.944 150.688, 320.944 147.313, 320.728 145.250 C 320.513 143.188, 320.336 144.875, 320.336 149 M 157.252 149.500 C 157.263 151.700, 157.468 152.482, 157.707 151.238 C 157.946 149.994, 157.937 148.194, 157.687 147.238 C 157.437 146.282, 157.241 147.300, 157.252 149.500 M 319.252 167.500 C 319.263 169.700, 319.468 170.482, 319.707 169.238 C 319.946 167.994, 319.937 166.194, 319.687 165.238 C 319.437 164.282, 319.241 165.300, 319.252 167.500 M 418 180.417 C 418 182.296, 417.438 184.060, 416.750 184.338 C 416.003 184.639, 416.205 184.874, 417.250 184.921 C 418.638 184.984, 419 184.173, 419 181 C 419 178.800, 418.775 177, 418.500 177 C 418.225 177, 418 178.537, 418 180.417 M 563.252 187.500 C 563.263 189.700, 563.468 190.482, 563.707 189.238 C 563.946 187.994, 563.937 186.194, 563.687 185.238 C 563.437 184.282, 563.241 185.300, 563.252 187.500 M 9 215.122 C 5.515 218.177, 5.514 218.181, 8.720 216.049 C 10.491 214.871, 12.205 213.478, 12.529 212.953 C 13.493 211.393, 12.693 211.884, 9 215.122 M 304.776 215.733 C 307.128 215.945, 310.728 215.942, 312.776 215.727 C 314.824 215.512, 312.900 215.339, 308.500 215.343 C 304.100 215.346, 302.424 215.522, 304.776 215.733 M 285.762 216.707 C 287.006 216.946, 288.806 216.937, 289.762 216.687 C 290.718 216.437, 289.700 216.241, 287.500 216.252 C 285.300 216.263, 284.518 216.468, 285.762 216.707 M 328.762 216.707 C 330.006 216.946, 331.806 216.937, 332.762 216.687 C 333.718 216.437, 332.700 216.241, 330.500 216.252 C 328.300 216.263, 327.518 216.468, 328.762 216.707 M 2.989 222.250 C 1.899 224.037, 1.006 225.912, 1.004 226.417 C 0.999 227.556, 1.141 227.370, 3.786 222.750 C 6.415 218.157, 5.742 217.735, 2.989 222.250 M 484 227.500 C 488.651 232.175, 492.681 236, 492.956 236 C 493.231 236, 489.651 232.175, 485 227.500 C 480.349 222.825, 476.319 219, 476.044 219 C 475.769 219, 479.349 222.825, 484 227.500 M 0.272 233 C 0.272 235.475, 0.467 236.488, 0.706 235.250 C 0.944 234.012, 0.944 231.988, 0.706 230.750 C 0.467 229.512, 0.272 230.525, 0.272 233 M 503.982 246.250 C 513.718 256.235, 515 257.454, 515 256.732 C 515 256.585, 510.163 251.747, 504.250 245.982 L 493.500 235.500 503.982 246.250 M 200.750 239.572 C 196.873 241.675, 197.312 242.401, 201.250 240.399 C 205.020 238.481, 205.687 237.985, 204.417 238.040 C 203.912 238.062, 202.262 238.751, 200.750 239.572 M 428.083 242.383 C 429.101 243.318, 443 249.973, 443 249.525 C 443 248.967, 429.445 242, 428.358 242 C 427.978 242, 427.854 242.172, 428.083 242.383 M 126 249.500 C 127.866 251.425, 129.617 253, 129.892 253 C 130.167 253, 128.866 251.425, 127 249.500 C 125.134 247.575, 123.383 246, 123.108 246 C 122.833 246, 124.134 247.575, 126 249.500 M 177.237 253.527 C 174.356 255.466, 172 257.271, 172 257.537 C 172 257.803, 174.475 256.377, 177.500 254.369 C 182.306 251.178, 183.718 250, 182.737 250 C 182.592 250, 180.117 251.587, 177.237 253.527 M 538.500 259 C 536.561 262.850, 535.200 266, 535.475 266 C 535.750 266, 537.561 262.850, 539.500 259 C 541.439 255.150, 542.800 252, 542.525 252 C 542.250 252, 540.439 255.150, 538.500 259 M 111.728 274.007 C 101.954 285.003, 94.166 294, 94.422 294 C 94.679 294, 102.193 285.788, 111.120 275.750 C 129.816 254.730, 130.448 253.998, 129.905 254.007 C 129.682 254.011, 121.503 263.011, 111.728 274.007 M 516 257.275 C 516 257.426, 519.487 260.914, 523.750 265.025 L 531.500 272.500 524.025 264.750 C 517.082 257.552, 516 256.544, 516 257.275 M 164.750 262.515 C 161.588 264.998, 159 267.247, 159 267.514 C 159 267.780, 161.700 265.901, 165 263.338 C 170.317 259.210, 171.621 257.998, 170.750 258.001 C 170.613 258.001, 167.912 260.033, 164.750 262.515 M 12.742 262.500 C 13.878 264.150, 17.356 268.200, 20.471 271.500 C 25.748 277.091, 25.676 276.954, 19.425 269.500 C 11.537 260.093, 9.916 258.396, 12.742 262.500 M 618.750 268.566 C 616.138 269.926, 614 271.262, 614 271.536 C 614 271.982, 623.900 267.306, 624.917 266.380 C 626.155 265.251, 622.901 266.405, 618.750 268.566 M 477 271.296 C 477 271.550, 479.117 273.493, 481.703 275.613 C 484.290 277.733, 486.084 278.945, 485.690 278.307 C 484.849 276.947, 477 270.614, 477 271.296 M 141.479 283.250 L 132.500 292.500 141.750 283.521 C 146.838 278.582, 151 274.420, 151 274.271 C 151 273.545, 149.819 274.659, 141.479 283.250 M 590.615 291.250 L 576.357 305.500 590.428 292.049 C 598.168 284.650, 604.928 278.238, 605.450 277.799 C 605.972 277.359, 606.057 277, 605.637 277 C 605.217 277, 598.457 283.413, 590.615 291.250 M 29.958 282.250 C 32.410 284.863, 34.548 287, 34.708 287 C 35.459 287, 34.665 286.102, 30.250 281.958 L 25.500 277.500 29.958 282.250 M 495.207 286.894 C 499.996 291.400, 507.421 298.789, 511.707 303.313 C 515.993 307.838, 518.385 310.182, 517.023 308.520 C 512.365 302.842, 498.507 288.859, 492.500 283.777 C 489.199 280.984, 490.416 282.386, 495.207 286.894 M 655.272 283 C 655.272 285.475, 655.467 286.488, 655.706 285.250 C 655.944 284.012, 655.944 281.988, 655.706 280.750 C 655.467 279.512, 655.272 280.525, 655.272 283 M 313.750 286.740 C 317.188 286.936, 322.813 286.936, 326.250 286.740 C 329.688 286.545, 326.875 286.385, 320 286.385 C 313.125 286.385, 310.313 286.545, 313.750 286.740 M 41.500 295 C 45.320 298.850, 48.671 302, 48.946 302 C 49.221 302, 46.320 298.850, 42.500 295 C 38.680 291.150, 35.329 288, 35.054 288 C 34.779 288, 37.680 291.150, 41.500 295 M 89.453 299.250 L 85.500 303.500 89.750 299.547 C 92.088 297.373, 94 295.460, 94 295.297 C 94 294.540, 93.129 295.298, 89.453 299.250 M 55.500 310 C 59.320 313.850, 62.671 317, 62.946 317 C 63.221 317, 60.320 313.850, 56.500 310 C 52.680 306.150, 49.329 303, 49.054 303 C 48.779 303, 51.680 306.150, 55.500 310 M 81.453 308.250 L 77.500 312.500 81.750 308.547 C 85.702 304.871, 86.460 304, 85.703 304 C 85.540 304, 83.627 305.913, 81.453 308.250 M 120.860 306.750 C 117.983 310.223, 116.765 312, 117.259 312 C 117.536 312, 118.964 310.425, 120.432 308.500 C 123.157 304.928, 123.487 303.579, 120.860 306.750 M 403 306.459 C 403 306.734, 404.800 307.878, 407 309 C 409.200 310.122, 411 310.816, 411 310.541 C 411 310.266, 409.200 309.122, 407 308 C 404.800 306.878, 403 306.184, 403 306.459 M 73 317.500 C 70.571 319.975, 68.809 322, 69.084 322 C 69.359 322, 71.571 319.975, 74 317.500 C 76.429 315.025, 78.191 313, 77.916 313 C 77.641 313, 75.429 315.025, 73 317.500 M 113.218 317.250 C 109.568 322.640, 108.779 324, 109.299 324 C 109.529 324, 111.360 321.525, 113.369 318.500 C 115.377 315.475, 116.812 313, 116.558 313 C 116.304 313, 114.801 314.913, 113.218 317.250 M 526.437 321.329 C 527.977 323.348, 529.440 325, 529.687 325 C 530.381 325, 526.052 319.150, 524.772 318.359 C 524.148 317.973, 524.897 319.310, 526.437 321.329 M 638 331 C 636.878 333.200, 636.184 335, 636.459 335 C 636.734 335, 637.878 333.200, 639 331 C 640.122 328.800, 640.816 327, 640.541 327 C 640.266 327, 639.122 328.800, 638 331 M 194.500 336.583 L 185.500 345.163 194.750 336.900 C 203.096 329.444, 204.559 327.998, 203.750 328.001 C 203.613 328.002, 199.450 331.863, 194.500 336.583 M 448.500 340 C 453.427 344.950, 457.683 349, 457.958 349 C 458.233 349, 454.427 344.950, 449.500 340 C 444.573 335.050, 440.317 331, 440.042 331 C 439.767 331, 443.573 335.050, 448.500 340 M 96.948 345.103 C 94.707 349.560, 93.035 353.368, 93.233 353.566 C 93.430 353.763, 95.480 350.117, 97.788 345.462 C 100.097 340.808, 101.769 337, 101.504 337 C 101.239 337, 99.189 340.647, 96.948 345.103 M 182.415 349.250 C 177.991 354.080, 175.632 357, 176.154 357 C 176.410 357, 178.755 354.525, 181.367 351.500 C 186.518 345.534, 187.241 343.982, 182.415 349.250 M 626.381 350.250 C 625.976 350.938, 625.002 352.625, 624.217 354 C 622.846 356.400, 622.856 356.420, 624.468 354.500 C 626.499 352.080, 628.250 349, 627.594 349 C 627.332 349, 626.786 349.563, 626.381 350.250 M 548.208 356.468 C 549.962 360.025, 551.563 362.771, 551.764 362.569 C 552.211 362.122, 546.165 350, 545.495 350 C 545.233 350, 546.454 352.911, 548.208 356.468 M 619 361.500 C 617.297 363.975, 616.129 366, 616.404 366 C 616.679 366, 618.297 363.975, 620 361.500 C 621.703 359.025, 622.871 357, 622.596 357 C 622.321 357, 620.703 359.025, 619 361.500 M 157.448 386.102 C 155.481 390.009, 154.035 393.368, 154.234 393.567 C 154.433 393.767, 156.258 390.570, 158.290 386.465 C 160.321 382.359, 161.768 379, 161.504 379 C 161.241 379, 159.416 382.196, 157.448 386.102 M 482.208 386.468 C 483.962 390.025, 485.563 392.771, 485.764 392.569 C 486.211 392.122, 480.165 380, 479.495 380 C 479.233 380, 480.454 382.911, 482.208 386.468 M 602.409 386.250 C 597.437 396.087, 592.427 396.512, 587.665 387.500 C 586.793 385.850, 586.062 384.867, 586.040 385.316 C 585.975 386.633, 588.090 390.324, 590.299 392.750 C 593.039 395.758, 596.077 395.587, 599.199 392.250 C 601.740 389.534, 605.521 383, 604.551 383 C 604.276 383, 603.312 384.462, 602.409 386.250 M 187.500 424.929 C 186.400 425.363, 188.929 425.501, 193.121 425.236 C 202.761 424.626, 209.135 426.606, 215.462 432.176 C 220.373 436.499, 223.464 441.587, 224.912 447.734 C 225.576 450.555, 225.822 450.872, 225.890 449 C 226.162 441.500, 215.467 428.710, 206.316 425.592 C 201.451 423.934, 190.960 423.565, 187.500 424.929 M 431.673 428.093 C 429.104 429.795, 426.687 431.707, 426.302 432.343 C 425.916 432.980, 427.153 432.331, 429.050 430.903 C 430.948 429.474, 433.850 427.580, 435.500 426.693 C 437.150 425.806, 438.015 425.062, 437.421 425.040 C 436.828 425.018, 434.241 426.392, 431.673 428.093 M 178.359 429.326 C 173.907 432.373, 166.924 441.712, 167.047 444.456 C 167.072 445.030, 168.159 443.475, 169.461 441 C 172.084 436.017, 177.889 430.075, 182.500 427.655 C 184.150 426.789, 184.987 426.062, 184.359 426.040 C 183.732 426.018, 181.032 427.497, 178.359 429.326 M 471.437 433.329 C 472.977 435.348, 474.440 437, 474.687 437 C 475.381 437, 471.052 431.150, 469.772 430.359 C 469.148 429.973, 469.897 431.310, 471.437 433.329 M 72.300 439 C 72.300 442.025, 72.487 443.262, 72.716 441.750 C 72.945 440.238, 72.945 437.762, 72.716 436.250 C 72.487 434.738, 72.300 435.975, 72.300 439 M 314.481 437.394 C 310.465 439.144, 305.359 445.087, 304.496 449.018 C 302.570 457.788, 307.171 466.372, 315.505 469.555 C 330.677 475.349, 344.366 459.462, 336.697 444.960 C 332.694 437.389, 322.477 433.910, 314.481 437.394 M 368.329 444.419 C 364.430 446.163, 363 448.680, 363 453.798 C 363 459.404, 366.744 463, 372.581 463 C 378.956 463, 382.500 459.645, 382.500 453.609 C 382.500 445.799, 375.456 441.231, 368.329 444.419 M 262.388 444.980 C 259.078 446.317, 256 450.933, 256 454.558 C 256 456.637, 256.952 458.978, 258.589 460.923 C 260.821 463.576, 261.843 464, 266 464 C 270.157 464, 271.179 463.576, 273.411 460.923 C 277.789 455.720, 276.376 448.355, 270.460 445.548 C 266.831 443.826, 265.480 443.731, 262.388 444.980 M 574.252 452.500 C 574.263 454.700, 574.468 455.482, 574.707 454.238 C 574.946 452.994, 574.937 451.194, 574.687 450.238 C 574.437 449.282, 574.241 450.300, 574.252 452.500 M 165.252 454.500 C 165.263 456.700, 165.468 457.482, 165.707 456.238 C 165.946 454.994, 165.937 453.194, 165.687 452.238 C 165.437 451.282, 165.241 452.300, 165.252 454.500 M 138.252 455.500 C 138.263 457.700, 138.468 458.482, 138.707 457.238 C 138.946 455.994, 138.937 454.194, 138.687 453.238 C 138.437 452.282, 138.241 453.300, 138.252 455.500 M 225.114 460 C 224.635 467.575, 217.205 477.042, 208.509 481.156 C 205.204 482.719, 203.077 483.999, 203.783 483.999 C 206.612 484.001, 214.846 478.912, 218.426 474.950 C 222.883 470.017, 226.307 462.843, 225.701 459.710 C 225.306 457.672, 225.260 457.695, 225.114 460 M 72.300 465 C 72.300 468.025, 72.487 469.262, 72.716 467.750 C 72.945 466.238, 72.945 463.762, 72.716 462.250 C 72.487 460.738, 72.300 461.975, 72.300 465 M 502.355 468.500 C 502.352 473.450, 502.521 475.601, 502.731 473.280 C 502.940 470.959, 502.943 466.909, 502.736 464.280 C 502.530 461.651, 502.358 463.550, 502.355 468.500 M 167.047 464.290 C 166.959 465.783, 170.797 472.503, 173.240 475.132 C 176.687 478.841, 182.965 482.777, 186.500 483.445 C 188.632 483.848, 188.291 483.559, 185.324 482.447 C 179.697 480.339, 172.445 473.775, 169.503 468.127 C 168.178 465.582, 167.072 463.855, 167.047 464.290 M 422.785 469.500 C 423.366 470.600, 425.775 473.300, 428.137 475.500 C 432.372 479.443, 432.364 479.422, 427.535 474 C 424.841 470.975, 422.432 468.275, 422.183 468 C 421.933 467.725, 422.204 468.400, 422.785 469.500 M 470.558 473.805 C 465.679 479.427, 465.671 479.449, 469.887 475.500 C 473.440 472.173, 476.868 467.845, 475.785 468.055 C 475.628 468.086, 473.276 470.673, 470.558 473.805 M 575.320 474 C 575.320 477.575, 575.502 479.038, 575.723 477.250 C 575.945 475.462, 575.945 472.538, 575.723 470.750 C 575.502 468.962, 575.320 470.425, 575.320 474 M 138.252 481.500 C 138.263 483.700, 138.468 484.482, 138.707 483.238 C 138.946 481.994, 138.937 480.194, 138.687 479.238 C 138.437 478.282, 138.241 479.300, 138.252 481.500 M 445.750 483.723 C 447.538 483.945, 450.462 483.945, 452.250 483.723 C 454.038 483.502, 452.575 483.320, 449 483.320 C 445.425 483.320, 443.962 483.502, 445.750 483.723 M 192.750 484.723 C 194.537 484.945, 197.463 484.945, 199.250 484.723 C 201.037 484.502, 199.575 484.320, 196 484.320 C 192.425 484.320, 190.963 484.502, 192.750 484.723 M 574.272 495 C 574.272 497.475, 574.467 498.488, 574.706 497.250 C 574.944 496.012, 574.944 493.988, 574.706 492.750 C 574.467 491.512, 574.272 492.525, 574.272 495 M 480 555 C 478.878 557.200, 478.184 559, 478.459 559 C 478.734 559, 479.878 557.200, 481 555 C 482.122 552.800, 482.816 551, 482.541 551 C 482.266 551, 481.122 552.800, 480 555 M 471.463 569.250 C 469.921 571.587, 469.299 572.972, 470.080 572.327 C 471.582 571.086, 475.411 565, 474.689 565 C 474.456 565, 473.004 566.913, 471.463 569.250 M 462.387 581.703 C 460.267 584.290, 459.055 586.084, 459.693 585.690 C 461.053 584.849, 467.386 577, 466.704 577 C 466.450 577, 464.507 579.117, 462.387 581.703 M 183.796 589.500 C 188.778 595.428, 195.629 602.191, 201.542 607.017 C 203.215 608.383, 201.673 606.767, 198.115 603.427 C 194.557 600.087, 188.745 594.237, 185.200 590.427 C 179.275 584.061, 179.161 583.986, 183.796 589.500 M 448.481 597.250 L 438.500 607.500 448.750 597.519 C 458.270 588.248, 459.455 587, 458.731 587 C 458.583 587, 453.971 591.612, 448.481 597.250 M 544.208 602.532 C 542.454 606.089, 541.233 609, 541.495 609 C 542.165 609, 548.211 596.878, 547.764 596.431 C 547.563 596.229, 545.962 598.975, 544.208 602.532 M 109 597.349 C 109 598.438, 120.963 622, 121.515 622 C 121.963 622, 110.329 598.100, 109.386 597.083 C 109.174 596.854, 109 596.974, 109 597.349 M 417.250 622.115 C 413.841 624.298, 412.738 625.764, 415.750 624.108 C 418.044 622.847, 421.639 620.068, 421 620.049 C 420.725 620.040, 419.038 620.970, 417.250 622.115 M 124.094 627.500 C 124.094 628.050, 125.402 630.975, 127 634 C 128.598 637.025, 129.906 639.050, 129.906 638.500 C 129.906 637.950, 128.598 635.025, 127 632 C 125.402 628.975, 124.094 626.950, 124.094 627.500 M 231 627.496 C 231 628.164, 245.122 635.212, 245.567 634.766 C 245.767 634.567, 242.570 632.742, 238.465 630.710 C 234.359 628.679, 231 627.232, 231 627.496 M 524.463 636.250 C 522.921 638.587, 522.299 639.972, 523.080 639.327 C 524.582 638.086, 528.411 632, 527.689 632 C 527.456 632, 526.004 633.913, 524.463 636.250 M 308.250 650.716 C 309.762 650.945, 312.238 650.945, 313.750 650.716 C 315.262 650.487, 314.025 650.300, 311 650.300 C 307.975 650.300, 306.738 650.487, 308.250 650.716 M 327.250 650.716 C 328.762 650.945, 331.238 650.945, 332.750 650.716 C 334.262 650.487, 333.025 650.300, 330 650.300 C 326.975 650.300, 325.738 650.487, 327.250 650.716 M 483.500 685.425 C 473.600 695.483, 462.350 706.526, 458.500 709.965 L 451.500 716.218 458 710.871 C 468.945 701.867, 504.251 666.602, 501.853 667.069 C 501.659 667.106, 493.400 675.367, 483.500 685.425 M 441.500 723.610 L 437.500 727.189 441.750 724.011 C 445.408 721.275, 446.727 719.957, 445.750 720.015 C 445.613 720.023, 443.700 721.641, 441.500 723.610 M 131.705 753.528 C 130.229 756.538, 129.234 759, 129.494 759 C 130.167 759, 135.211 748.878, 134.762 748.429 C 134.557 748.224, 133.182 750.518, 131.705 753.528 M 358 774.500 C 350.025 778.567, 343.843 781.919, 344.263 781.948 C 345.326 782.021, 373 768.101, 373 767.493 C 373 766.808, 373.986 766.347, 358 774.500 M 115.833 779.250 C 114.566 781.038, 111.133 785.425, 108.205 789 L 102.881 795.500 107.775 790.244 C 112.743 784.909, 119.532 776, 118.630 776 C 118.359 776, 117.100 777.462, 115.833 779.250 M 330 788 C 328.075 789.054, 326.950 789.916, 327.500 789.916 C 328.050 789.916, 330.075 789.054, 332 788 C 333.925 786.946, 335.050 786.084, 334.500 786.084 C 333.950 786.084, 331.925 786.946, 330 788 M 96.966 801.750 L 91.500 807.500 97.250 802.034 C 100.412 799.028, 103 796.440, 103 796.284 C 103 795.542, 102.044 796.408, 96.966 801.750 M 86.946 810.750 L 83.500 814.500 87.250 811.054 C 89.313 809.158, 91 807.471, 91 807.304 C 91 806.540, 90.154 807.260, 86.946 810.750 M 42.250 843.099 C 39.913 844.755, 38 846.332, 38 846.603 C 38 846.874, 40.025 845.703, 42.500 844 C 44.975 842.297, 47 840.701, 47 840.452 C 47 839.764, 46.810 839.869, 42.250 843.099 M 56.762 861.707 C 58.006 861.946, 59.806 861.937, 60.762 861.687 C 61.718 861.437, 60.700 861.241, 58.500 861.252 C 56.300 861.263, 55.518 861.468, 56.762 861.707' stroke='none' fill='%23d3c38c' fill-rule='evenodd'/%3E%3Cpath d='M 361.500 1.345 C 349.576 4.452, 342.265 11.008, 337.226 23.112 C 331.949 35.787, 326.211 67.851, 323.556 99.500 C 321.664 122.062, 319.633 169.403, 320.424 172.552 C 320.858 174.284, 321.879 175.032, 324.258 175.360 C 335.014 176.847, 417.365 183.969, 417.878 183.457 C 418.220 183.115, 418.657 169.485, 418.849 153.168 C 419.201 123.148, 418.053 97.356, 415.502 78.018 C 413.724 64.534, 408.449 36.168, 406.392 29.030 C 401.214 11.056, 390.191 1.364, 373.894 0.455 C 369.634 0.217, 364.381 0.595, 361.500 1.345 M 179.615 59.411 C 174.752 61.221, 168.975 66.792, 165.675 72.855 C 156.106 90.437, 154.540 126.047, 160.919 181 C 163.840 206.165, 164.763 212.690, 165.603 214.131 C 165.951 214.728, 252.447 180.887, 253.650 179.683 C 254.979 178.354, 245.759 130.396, 241.794 118.010 C 233.367 91.691, 217.722 69.475, 201.991 61.491 C 195.321 58.106, 185.560 57.198, 179.615 59.411 M 528.942 120.948 C 518.796 124.027, 509.710 133.521, 493.028 158.472 C 484.445 171.309, 467.448 198.272, 465.056 202.843 C 463.089 206.602, 464.609 209.604, 471.263 215.105 C 476.725 219.621, 497.791 239.408, 523.638 264.299 L 531.775 272.135 540.897 254.643 C 555.235 227.150, 560.719 210.628, 563.121 187.692 C 565.726 162.813, 559.174 137.984, 547 126.596 C 540.935 120.924, 535.069 119.089, 528.942 120.948 M 25.500 207.339 C 15.407 209.968, 7.648 215.556, 3.495 223.187 C 1.056 227.667, 0.802 228.995, 1.233 235.018 C 1.805 243.001, 5.426 251.422, 12.191 260.500 C 22.388 274.182, 66.235 321, 68.852 321 C 69.465 321, 83.465 305.824, 99.963 287.276 L 129.959 253.553 126.729 250.180 C 119.326 242.448, 81.116 219.094, 66.270 213.228 C 50.099 206.838, 35.513 204.731, 25.500 207.339 M 287.500 216.601 C 238.216 221.493, 197.225 237.573, 161.541 266.013 C 118.738 300.127, 88.124 350.699, 77.103 405.500 C 73.680 422.518, 72.723 432.795, 72.725 452.500 C 72.731 501.730, 85.825 549, 116.736 611.374 C 130.040 638.222, 135.292 650.045, 139.397 662.396 C 152.144 700.743, 146.458 734.935, 121.048 772.742 C 104.215 797.788, 89.542 811.545, 52.500 837.013 C 24.401 856.332, 20.636 859.217, 22.308 860.152 C 25.133 861.733, 47.293 862.266, 60.500 861.071 C 78.473 859.444, 124.834 852.604, 146.500 848.381 C 216.398 834.761, 286.545 810.248, 358.221 774.396 C 412.994 746.998, 450.039 720.613, 486.038 683.355 C 523.260 644.833, 550.441 599.372, 563.613 553.609 C 567.723 539.328, 571.393 521.473, 573.194 507 C 574.898 493.299, 574.864 452.476, 573.138 440 C 566.580 392.594, 552.053 355.742, 526.371 321.360 C 485.837 267.097, 421.680 230.041, 349 218.914 C 336.060 216.933, 298.418 215.518, 287.500 216.601 M 628.500 265.346 C 621.218 267.770, 612.357 272.820, 604.880 278.806 C 596.133 285.809, 575.321 307.008, 572.259 312.032 C 568.955 317.454, 567.764 324.252, 568.961 330.864 C 570.369 338.646, 586.831 386.451, 589.441 390.337 C 592.330 394.639, 596.065 395.022, 598.886 391.305 C 602.451 386.608, 621.026 358.723, 629.239 345.736 C 644.898 320.976, 655 296.171, 655 282.482 C 655 276.039, 651.645 269.203, 647.244 266.678 C 643.080 264.288, 633.682 263.620, 628.500 265.346 M 301 287.033 C 228.155 295.953, 169.440 343.615, 146.930 412.100 C 139.990 433.217, 138.501 443.328, 138.549 469 C 138.588 489.487, 138.831 492.624, 141.263 504.058 C 154.065 564.253, 193.815 613.187, 248.703 636.324 C 299.660 657.803, 354.899 655.690, 404 630.383 C 438.904 612.393, 466.896 583.750, 484.021 548.500 C 501.728 512.056, 507.033 470.983, 498.990 432.626 C 491.324 396.066, 475.172 366.131, 449.013 340 C 421.251 312.267, 388.522 295.264, 350 288.562 C 338.682 286.593, 311.516 285.745, 301 287.033 M 442.734 424.088 C 420.156 429.407, 411.483 456.087, 426.796 473.118 C 433.739 480.841, 437.656 482.494, 449 482.494 C 460.394 482.494, 464.256 480.846, 471.353 472.953 C 486.371 456.249, 478.324 430.226, 456.373 424.509 C 449.966 422.840, 448.255 422.787, 442.734 424.088 M 186.994 425.934 C 179.719 428.147, 172.910 434.193, 168.901 442 C 165.438 448.743, 165.599 460.581, 169.250 467.623 C 180.916 490.131, 212.917 489.200, 223.337 466.051 C 226.253 459.571, 226.128 449.237, 223.047 442.221 C 220.198 435.733, 212.764 428.789, 206.316 426.592 C 201.482 424.945, 191.377 424.601, 186.994 425.934' stroke='none' fill='%231c2c4c' fill-rule='evenodd'/%3E%3C/svg%3E";

  // src/ILibrasWidget.js
  var defaultConfig = {
    position: "bottom-right",
    redirectUrl: "",
    primaryColor: "#4A90E2",
    title: "iLibras",
    message: "Olá, somos a equipe iLibras e estamos aqui para ajudar você! 😊",
    buttonText: "Iniciar atendimento em Libras",
    // Segunda saída do formulário: em vez de entrar na fila ao vivo, a pessoa
    // cai direto no calendário e marca dia e hora. Desligue com
    // `agendamento: false` no site que só atende ao vivo — um botão que leva a
    // uma agenda que ninguém cobre é pior do que não ter o botão.
    agendamento: true,
    scheduleButtonText: "Agendar uma conversa",
    token: "",
    zIndex: 9999,
    apiUrl: "https://sistema.ilibras.com.br/api/public/widget/cadastrar",
    // Prazo de cada tentativa. Acima disso a requisição é abortada: melhor
    // dizer que o serviço não respondeu do que deixar a pessoa no "Aguarde".
    timeoutMs: 15e3,
    // Uma retentativa para falha de rede e erro de servidor. Erro de validação
    // e limite de uso não são retentados — repetir não muda a resposta.
    tentativas: 2,
    // Plano de contingência do cliente, mostrado quando a API não responde.
    // Qualquer combinação de telefone, e-mail e link.
    fallback: {
      telefone: "",
      email: "",
      url: "",
      texto: ""
    }
  };
  var FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var ILibrasWidget = class {
    constructor(config = {}) {
      this.config = {
        ...defaultConfig,
        ...config,
        fallback: { ...defaultConfig.fallback, ...config.fallback || {} }
      };
      this.isOpen = false;
      this.enviando = false;
      this.abertoEm = null;
      this.focoAnterior = null;
      this.init();
    }
    init() {
      this.injectStyles();
      this.createWidget();
      this.attachEventListeners();
    }
    /**
     * O estilo vai embutido no próprio arquivo. Era um <link> para um CSS irmão,
     * o que exigia o widget saber de onde foi carregado — e essa conta não fecha
     * quando quem carrega é um bundler, que não deixa <script src> na página.
     *
     * Continua sendo um <style> acrescentado ao fim do <head>, na mesma posição
     * de cascata do <link> de antes: quem sobrescreve o visual pelo CSS do
     * próprio site segue sobrescrevendo igual.
     */
    injectStyles() {
      if (document.getElementById("ilibras-widget-styles")) return;
      const style = document.createElement("style");
      style.id = "ilibras-widget-styles";
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    createWidget() {
      const container = document.createElement("div");
      container.id = "ilibras-widget-container";
      container.className = `ilibras-widget-${this.config.position}`;
      container.style.zIndex = this.config.zIndex;
      container.lang = "pt-BR";
      container.innerHTML = `
      <button type="button" id="ilibras-widget-button" class="ilibras-widget-button"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="ilibras-widget-modal">
        <img src="${LOGO}" width="32" height="32" alt="" aria-hidden="true">
        <span class="ilibras-widget-sr-only">Abrir atendimento em Libras</span>
      </button>

      <div id="ilibras-widget-modal" class="ilibras-widget-modal" role="dialog" aria-modal="true"
           aria-labelledby="ilibras-widget-titulo" hidden>
        <div class="ilibras-widget-header">
          <div class="ilibras-widget-header-content">
            <h2 class="ilibras-widget-title" id="ilibras-widget-titulo">${this.escapar(this.config.title)}</h2>
          </div>
          <button type="button" id="ilibras-widget-close" class="ilibras-widget-close" aria-label="Fechar atendimento em Libras">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div class="ilibras-widget-body">
          <p class="ilibras-widget-message">${this.escapar(this.config.message)}</p>

          <!-- Falha de serviço e limite de uso aparecem aqui. role="alert" para
               o leitor de tela anunciar sem precisar que o foco venha junto. -->
          <div id="ilibras-widget-aviso" class="ilibras-widget-aviso" role="alert" hidden></div>

          <form id="ilibras-widget-form" class="ilibras-widget-form" novalidate>
            <p class="ilibras-widget-legenda" id="ilibras-widget-legenda">
              Campos marcados com asterisco são obrigatórios.
            </p>

            <div class="ilibras-widget-form-group">
              <label for="ilibras-name">Nome completo <span aria-hidden="true">*</span></label>
              <input type="text" id="ilibras-name" name="name" placeholder="Ex.: Maria da Silva"
                     required aria-required="true" autocomplete="name" maxlength="120"
                     aria-describedby="ilibras-name-dica ilibras-name-erro" />
              <span class="ilibras-widget-dica" id="ilibras-name-dica">Informe nome e sobrenome.</span>
              <span class="ilibras-widget-erro" id="ilibras-name-erro" hidden></span>
            </div>

            <div class="ilibras-widget-form-group">
              <label for="ilibras-consent" class="ilibras-widget-checkbox-label">
                <input type="checkbox" id="ilibras-consent" name="consent" required aria-required="true"
                       aria-describedby="ilibras-consent-erro" />
                <span>Aceito ser redirecionado para atendimento em Libras <span aria-hidden="true">*</span></span>
              </label>
              <span class="ilibras-widget-erro" id="ilibras-consent-erro" hidden></span>
            </div>

            <!-- Armadilha: fica fora da tela, fora da ordem de tabulação e
                 escondida do leitor de tela. Só chega preenchida quando quem
                 respondeu foi um programa que preenche todo campo que acha. -->
            <div class="ilibras-widget-hp" aria-hidden="true">
              <label for="ilibras-site-url">Não preencha este campo</label>
              <input type="text" id="ilibras-site-url" name="site_url" tabindex="-1" autocomplete="off" />
            </div>

            <button type="submit" id="ilibras-widget-submit" class="ilibras-widget-submit">
              ${this.escapar(this.config.buttonText)}
            </button>

            ${this.config.agendamento ? `
            <!-- type="button" de propósito: Enter dentro de um campo aciona o
                 primeiro submit do formulário, e quem digitou e apertou Enter
                 quis o atendimento agora, não a agenda. -->
            <button type="button" id="ilibras-widget-agendar" class="ilibras-widget-agendar"
                    aria-describedby="ilibras-widget-agendar-dica">
              ${this.escapar(this.config.scheduleButtonText)}
            </button>
            <span class="ilibras-widget-dica ilibras-widget-dica-agendar" id="ilibras-widget-agendar-dica">
              Escolha data e horário em vez de esperar na fila.
            </span>` : ""}

            <!-- Estado do envio, anunciado sem roubar o foco de quem digita. -->
            <p class="ilibras-widget-status" id="ilibras-widget-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    `;
      document.body.appendChild(container);
      this.container = container;
      this.botao = container.querySelector("#ilibras-widget-button");
      this.modal = container.querySelector("#ilibras-widget-modal");
      this.form = container.querySelector("#ilibras-widget-form");
      this.submit = container.querySelector("#ilibras-widget-submit");
      this.agendar = container.querySelector("#ilibras-widget-agendar");
      this.aviso = container.querySelector("#ilibras-widget-aviso");
      this.status = container.querySelector("#ilibras-widget-status");
    }
    escapar(texto) {
      const div = document.createElement("div");
      div.textContent = texto == null ? "" : String(texto);
      return div.innerHTML;
    }
    attachEventListeners() {
      this.botao.addEventListener("click", () => this.toggleWidget());
      this.container.querySelector("#ilibras-widget-close").addEventListener("click", () => this.closeWidget());
      this.modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          this.closeWidget();
          return;
        }
        if (e.key === "Tab") this.prenderFoco(e);
      });
      const nome = this.container.querySelector("#ilibras-name");
      nome.addEventListener("blur", () => {
        if (nome.value.trim() !== "") this.validarCampo("nome");
      });
      nome.addEventListener("input", () => this.limparErro("name"));
      this.container.querySelector("#ilibras-consent").addEventListener("change", () => this.limparErro("consent"));
      this.form.addEventListener("submit", (e) => this.handleSubmit(e, "fila"));
      if (this.agendar) {
        this.agendar.addEventListener("click", (e) => this.handleSubmit(e, "agendamento"));
      }
    }
    prenderFoco(evento) {
      const focaveis = Array.from(this.modal.querySelectorAll(FOCAVEIS)).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
    toggleWidget() {
      if (this.isOpen) this.closeWidget();
      else this.openWidget();
    }
    openWidget() {
      this.focoAnterior = document.activeElement;
      this.modal.hidden = false;
      requestAnimationFrame(() => this.modal.classList.add("ilibras-widget-modal-open"));
      this.botao.classList.add("ilibras-widget-button-open");
      this.botao.setAttribute("aria-expanded", "true");
      this.isOpen = true;
      this.abertoEm = Date.now();
      this.container.querySelector("#ilibras-name").focus();
    }
    closeWidget() {
      this.modal.classList.remove("ilibras-widget-modal-open");
      this.botao.classList.remove("ilibras-widget-button-open");
      this.botao.setAttribute("aria-expanded", "false");
      this.isOpen = false;
      window.setTimeout(() => {
        if (!this.isOpen) this.modal.hidden = true;
      }, 240);
      if (this.focoAnterior && document.contains(this.focoAnterior)) {
        this.focoAnterior.focus();
      } else {
        this.botao.focus();
      }
    }
    // ─── Validação ──────────────────────────────────────────────────────────
    // Espelha as regras do servidor. Aqui é para avisar cedo e em português;
    // lá é onde a regra vale.
    valores() {
      return {
        nome: this.container.querySelector("#ilibras-name").value.trim().replace(/\s+/g, " "),
        consentimento: this.container.querySelector("#ilibras-consent").checked,
        honeypot: this.container.querySelector("#ilibras-site-url").value
      };
    }
    erroDoCampo(campo, v) {
      if (campo === "nome") {
        if (!v.nome) return "Informe seu nome completo.";
        if (v.nome.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
        if (v.nome.length > 120) return "O nome deve ter no máximo 120 caracteres.";
        if (!/^\p{L}[\p{L}\p{M}'’\-. ]*$/u.test(v.nome)) {
          return "O nome deve conter apenas letras, espaços, apóstrofos e hífens.";
        }
        const palavras = v.nome.split(" ").filter((p) => p.replace(/[^\p{L}]/gu, "").length >= 2);
        if (palavras.length < 2) return "Informe o nome completo (nome e sobrenome).";
        return null;
      }
      if (campo === "consent" && !v.consentimento) {
        return "É preciso aceitar para continuar.";
      }
      return null;
    }
    validarCampo(campo) {
      const erro = this.erroDoCampo(campo, this.valores());
      const id = { nome: "name", consent: "consent" }[campo];
      if (erro) this.mostrarErro(id, erro);
      else this.limparErro(id);
      return !erro;
    }
    /**
     * @returns {HTMLElement|null} primeiro campo inválido, para receber o foco
     */
    validarTudo() {
      const v = this.valores();
      let primeiroInvalido = null;
      for (const [campo, id] of [["nome", "name"], ["consent", "consent"]]) {
        const erro = this.erroDoCampo(campo, v);
        if (erro) {
          this.mostrarErro(id, erro);
          if (!primeiroInvalido) primeiroInvalido = this.container.querySelector("#ilibras-" + id);
        } else {
          this.limparErro(id);
        }
      }
      return primeiroInvalido;
    }
    mostrarErro(id, mensagem) {
      const campo = this.container.querySelector("#ilibras-" + id);
      const alvo = this.container.querySelector("#ilibras-" + id + "-erro");
      if (!alvo) return;
      alvo.textContent = mensagem;
      alvo.hidden = false;
      if (campo) {
        campo.setAttribute("aria-invalid", "true");
        campo.classList.add("ilibras-widget-invalido");
      }
    }
    limparErro(id) {
      const campo = this.container.querySelector("#ilibras-" + id);
      const alvo = this.container.querySelector("#ilibras-" + id + "-erro");
      if (alvo) {
        alvo.textContent = "";
        alvo.hidden = true;
      }
      if (campo) {
        campo.removeAttribute("aria-invalid");
        campo.classList.remove("ilibras-widget-invalido");
      }
    }
    // ─── Avisos ─────────────────────────────────────────────────────────────
    mostrarAviso(mensagem, { fallback = false } = {}) {
      this.aviso.innerHTML = "";
      const texto = document.createElement("p");
      texto.className = "ilibras-widget-aviso-texto";
      texto.textContent = mensagem;
      this.aviso.appendChild(texto);
      if (fallback) {
        const alternativa = this.blocoFallback();
        if (alternativa) this.aviso.appendChild(alternativa);
      }
      this.aviso.hidden = false;
    }
    limparAviso() {
      this.aviso.hidden = true;
      this.aviso.innerHTML = "";
    }
    /**
     * Plano de contingência: quando a API não responde, o atendimento não
     * precisa acabar aqui. Só aparece se o cliente configurou algum canal.
     */
    blocoFallback() {
      const { telefone, email, url, texto } = this.config.fallback;
      if (!telefone && !email && !url) return null;
      const bloco = document.createElement("div");
      bloco.className = "ilibras-widget-fallback";
      const titulo = document.createElement("p");
      titulo.textContent = texto || "Enquanto isso, você pode falar com a gente por aqui:";
      bloco.appendChild(titulo);
      const lista = document.createElement("ul");
      const canais = [
        telefone && { href: "tel:" + String(telefone).replace(/[^\d+]/g, ""), rotulo: "Telefone: " + telefone },
        email && { href: "mailto:" + email, rotulo: "E-mail: " + email },
        url && { href: url, rotulo: "Outra forma de atendimento", externo: true }
      ].filter(Boolean);
      for (const canal of canais) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = canal.href;
        link.textContent = canal.rotulo;
        if (canal.externo) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          const nota = document.createElement("span");
          nota.className = "ilibras-widget-sr-only";
          nota.textContent = " (abre em nova aba)";
          link.appendChild(nota);
        }
        item.appendChild(link);
        lista.appendChild(item);
      }
      bloco.appendChild(lista);
      return bloco;
    }
    anunciar(mensagem) {
      this.status.textContent = mensagem;
    }
    // ─── Envio ──────────────────────────────────────────────────────────────
    /**
     * @param {string} modo 'fila' entra na espera ao vivo; 'agendamento' leva a
     *   pessoa direto ao calendário. O cadastro é o mesmo nos dois — o que muda
     *   é para onde o iLibras devolve o link.
     */
    async handleSubmit(e, modo = "fila") {
      e.preventDefault();
      if (this.enviando) return;
      this.limparAviso();
      if (!this.config.token) {
        this.mostrarAviso(
          "Este atendimento não está configurado corretamente. Avise o responsável pelo site.",
          { fallback: true }
        );
        return;
      }
      const invalido = this.validarTudo();
      if (invalido) {
        this.anunciar("O formulário tem campos a corrigir.");
        invalido.focus();
        return;
      }
      const v = this.valores();
      const corpo = new FormData();
      corpo.append("nome", v.nome);
      corpo.append("site_url", v.honeypot);
      corpo.append("iniciado_em", String(this.abertoEm || Date.now()));
      corpo.append("modo", modo);
      this.travarEnvio(true, modo);
      try {
        const resultado = await this.enviarComRetentativa(corpo);
        const destino = resultado.link_fila || resultado.link || resultado.url || resultado.redirect;
        if (!destino) throw new FalhaDeServico("resposta_inesperada");
        this.anunciar(modo === "agendamento" ? "Cadastro feito. Abrindo o calendário para escolher data e horário." : "Atendimento criado. Abrindo a sala de atendimento.");
        const aba = window.open(destino, "_blank", "noopener");
        if (!aba) window.location.assign(destino);
        this.form.reset();
        this.closeWidget();
      } catch (erro) {
        this.tratarFalha(erro);
      } finally {
        this.travarEnvio(false, modo);
      }
    }
    travarEnvio(travado, modo = "fila") {
      this.enviando = travado;
      for (const botao of [this.submit, this.agendar]) {
        if (botao) botao.disabled = travado;
      }
      const usouAgendar = modo === "agendamento" && this.agendar;
      const ativo = usouAgendar ? this.agendar : this.submit;
      const rotulo = usouAgendar ? this.config.scheduleButtonText : this.config.buttonText;
      ativo.setAttribute("aria-busy", travado ? "true" : "false");
      ativo.textContent = travado ? "Enviando..." : rotulo;
      if (travado) this.anunciar("Enviando seus dados. Aguarde.");
    }
    /**
     * Falha de rede e erro de servidor ganham uma segunda chance — costumam ser
     * momentâneos. Erro de validação e limite de uso, não: a resposta seria a
     * mesma, e insistir só gasta a cota de quem está esperando.
     */
    async enviarComRetentativa(corpo) {
      let ultimaFalha = null;
      for (let tentativa = 1; tentativa <= this.config.tentativas; tentativa++) {
        try {
          return await this.enviar(corpo);
        } catch (erro) {
          ultimaFalha = erro;
          const vaiRepetir = erro instanceof FalhaDeServico && ["rede", "timeout", "servidor"].includes(erro.tipo) && tentativa < this.config.tentativas;
          if (!vaiRepetir) break;
          this.anunciar("O serviço não respondeu. Tentando novamente...");
          await new Promise((r) => window.setTimeout(r, 1200 * tentativa));
        }
      }
      throw ultimaFalha;
    }
    async enviar(corpo) {
      if (navigator.onLine === false) throw new FalhaDeServico("offline");
      const controle = new AbortController();
      const prazo = window.setTimeout(() => controle.abort(), this.config.timeoutMs);
      let resposta;
      try {
        resposta = await fetch(this.config.apiUrl, {
          method: "POST",
          headers: { Authorization: `Bearer ${this.config.token}`, Accept: "application/json" },
          body: corpo,
          signal: controle.signal
        });
      } catch (erro) {
        throw new FalhaDeServico(erro && erro.name === "AbortError" ? "timeout" : "rede");
      } finally {
        window.clearTimeout(prazo);
      }
      let dados = null;
      try {
        dados = await resposta.json();
      } catch (e) {
        dados = null;
      }
      if (resposta.ok) return dados || {};
      if (resposta.status === 429) {
        throw new FalhaDeServico("limite", {
          mensagem: dados && dados.message,
          esperarSegundos: parseInt(resposta.headers.get("Retry-After") || "0", 10)
        });
      }
      if (resposta.status === 422) {
        throw new FalhaDeServico("validacao", {
          mensagem: dados && dados.message,
          erros: dados && dados.errors || null
        });
      }
      if (resposta.status === 401 || resposta.status === 403) {
        throw new FalhaDeServico("autorizacao");
      }
      if (resposta.status >= 500) throw new FalhaDeServico("servidor");
      throw new FalhaDeServico("desconhecido", { mensagem: dados && dados.message });
    }
    /**
     * Traduz a falha para quem está esperando atendimento. O detalhe técnico
     * vai para o console; a tela recebe o que a pessoa pode fazer a respeito.
     */
    tratarFalha(erro) {
      const tipo = erro instanceof FalhaDeServico ? erro.tipo : "desconhecido";
      if (tipo === "validacao" && erro.detalhe.erros) {
        const mapa = { nome: "name" };
        let primeiro = null;
        for (const [campo, mensagens2] of Object.entries(erro.detalhe.erros)) {
          const id = mapa[campo];
          if (!id) continue;
          this.mostrarErro(id, Array.isArray(mensagens2) ? mensagens2[0] : String(mensagens2));
          if (!primeiro) primeiro = this.container.querySelector("#ilibras-" + id);
        }
        this.anunciar("O formulário tem campos a corrigir.");
        if (primeiro) primeiro.focus();
        else this.mostrarAviso(erro.detalhe.mensagem || "Verifique os dados informados.");
        return;
      }
      const mensagens = {
        offline: "Você parece estar sem conexão com a internet. Verifique a rede e tente novamente.",
        rede: "Não conseguimos falar com o serviço de atendimento. Verifique sua conexão e tente novamente.",
        timeout: "O serviço de atendimento demorou para responder. Tente novamente em instantes.",
        servidor: "O serviço de atendimento está indisponível no momento. Já estamos avisados — tente novamente em alguns minutos.",
        autorizacao: "Este atendimento não está configurado corretamente. Avise o responsável pelo site.",
        limite: erro.detalhe.mensagem || "Muitas solicitações seguidas. Aguarde um instante e tente novamente.",
        validacao: erro.detalhe.mensagem || "Verifique os dados informados.",
        resposta_inesperada: "O serviço respondeu de forma inesperada. Tente novamente em instantes.",
        desconhecido: "Não foi possível iniciar o atendimento agora. Tente novamente em instantes."
      };
      const problemaDeServico = ["offline", "rede", "timeout", "servidor", "autorizacao", "resposta_inesperada", "desconhecido"].includes(tipo);
      this.mostrarAviso(mensagens[tipo] || mensagens.desconhecido, { fallback: problemaDeServico });
      this.anunciar("");
      this.aviso.setAttribute("tabindex", "-1");
      this.aviso.focus();
      if (console && console.error) console.error("[iLibras] falha ao criar atendimento:", tipo, erro);
    }
    destroy() {
      if (this.container) this.container.remove();
      const styles = document.getElementById("ilibras-widget-styles");
      if (styles) styles.remove();
    }
  };
  var FalhaDeServico = class extends Error {
    constructor(tipo, detalhe = {}) {
      super("iLibras: " + tipo);
      this.name = "FalhaDeServico";
      this.tipo = tipo;
      this.detalhe = detalhe;
    }
  };
  var ILibrasWidget_default = ILibrasWidget;

  // src/navegador.js
  window.ILibrasWidget = ILibrasWidget_default;
  if (window.iLibrasWidgetConfig) {
    window.iLibrasWidgetInstance = new ILibrasWidget_default(window.iLibrasWidgetConfig);
  }
})();
