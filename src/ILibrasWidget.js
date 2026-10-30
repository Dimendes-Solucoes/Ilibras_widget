/**
 * iLibras Widget
 *
 * Formulário embarcado que cria um atendimento em Libras no iLibras e leva a
 * pessoa para a fila. Roda dentro do site do cliente, então três coisas valem
 * mais aqui do que numa página nossa:
 *
 * - acessibilidade: o público deste widget é surdo, e boa parte navega por
 *   teclado e leitor de tela. Diálogo com papel declarado, foco preso enquanto
 *   aberto, erro anunciado e devolvido ao campo certo.
 * - indisponibilidade: a rede é de terceiros e a API é nossa. Toda chamada tem
 *   prazo, uma retentativa e uma mensagem que diz o que aconteceu — e, quando
 *   nada funciona, o canal alternativo configurado pelo cliente.
 * - validação: a checagem daqui é conveniência para quem digita. A que vale é
 *   a do servidor, porque esta some com um F12.
 *
 * Desde a v1.5.0 o formulário pede só o nome. CPF e telefone saíram: para
 * chamar um intérprete não é preciso identificar a pessoa, e todo campo a mais
 * é uma barreira a quem só quer ser atendido.
 *
 * Desde a v1.6.0 o widget avisa antes de levar a pessoa para o iLibras, e só
 * cria o atendimento depois do "sim". Criar antes e perguntar depois deixaria
 * um atendimento órfão na fila de quem desistiu — com o alarme dos
 * intérpretes tocando para ninguém.
 *
 * Desde a v1.7.0 o widget acompanha o tema do site, claro ou escuro. Quem
 * decide é o fundo do site, não o sistema: o ícone flutua sobre a página, e
 * num site claro aberto num computador em modo escuro um ícone branco sumiria.
 */
import { CSS, LOGO } from './assets-gerados.js';

// A logo é azul-marinho sobre fundo transparente: num site escuro, some. A
// versão do tema escuro troca só o azul por branco, e o dourado continua. Sai
// da mesma string em vez de vir embutida em dobro — seriam 23 KB a mais no
// arquivo que todo visitante baixa.
const LOGO_ESCURO = LOGO.replace(/%231c2c4c/gi, '%23ffffff');

const defaultConfig = {
  position: 'bottom-right',
  redirectUrl: '',
  primaryColor: '#4A90E2',
  title: 'iLibras',
  message: 'Olá, somos a equipe iLibras e estamos aqui para ajudar você! 😊',
  buttonText: 'Iniciar atendimento em Libras',

  // Segunda saída do formulário: em vez de entrar na fila ao vivo, a pessoa
  // cai direto no calendário e marca dia e hora. Desligue com
  // `agendamento: false` no site que só atende ao vivo — um botão que leva a
  // uma agenda que ninguém cobre é pior do que não ter o botão.
  agendamento: true,
  scheduleButtonText: 'Agendar uma conversa',

  // Avisa que a pessoa vai sair do site para o iLibras e espera a confirmação
  // antes de criar o atendimento. Sair do site em que se estava, para uma aba
  // nova, sem saber antes, desorienta — sobretudo quem usa leitor de tela.
  confirmarRedirecionamento: true,

  // 'auto' lê o fundo do site e acompanha quando ele muda. 'claro' e 'escuro'
  // fixam o tema — para o site cujo fundo o widget não consegue ler, como um
  // gradiente ou uma imagem.
  tema: 'auto',

  token: '',
  zIndex: 9999,

  apiUrl: 'https://sistema.ilibras.com.br/api/public/widget/cadastrar',

  // Prazo de cada tentativa. Acima disso a requisição é abortada: melhor
  // dizer que o serviço não respondeu do que deixar a pessoa no "Aguarde".
  timeoutMs: 15000,

  // Uma retentativa para falha de rede e erro de servidor. Erro de validação
  // e limite de uso não são retentados — repetir não muda a resposta.
  tentativas: 2,

  // Plano de contingência do cliente, mostrado quando a API não responde.
  // Qualquer combinação de telefone, e-mail e link.
  fallback: {
    telefone: '',
    email: '',
    url: '',
    texto: ''
  }
};

/** Elementos que recebem foco — usado para prender o foco no diálogo. */
const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

class ILibrasWidget {
  constructor(config = {}) {
    this.config = {
      ...defaultConfig,
      ...config,
      fallback: { ...defaultConfig.fallback, ...(config.fallback || {}) }
    };
    this.isOpen = false;
    this.enviando = false;
    this.abertoEm = null;
    this.focoAnterior = null;
    // Qual botão levou à confirmação: 'fila' ou 'agendamento'.
    this.modoPendente = null;
    this.init();
  }

  init() {
    this.injectStyles();
    this.createWidget();
    this.observarTema();
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
    if (document.getElementById('ilibras-widget-styles')) return;

    const style = document.createElement('style');
    style.id = 'ilibras-widget-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  createWidget() {
    const container = document.createElement('div');
    container.id = 'ilibras-widget-container';
    container.className = `ilibras-widget-${this.config.position}`;
    container.style.zIndex = this.config.zIndex;
    // O site que embarca pode estar em outro idioma; o conteúdo daqui é em
    // português e o leitor de tela precisa trocar de voz para lê-lo.
    container.lang = 'pt-BR';

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
            </span>` : ''}
          </form>

          <!-- Aviso de saída do site. Ocupa o lugar do formulário em vez de
               abrir uma janela por cima: o diálogo já é modal, e um segundo
               diálogo empilhado confunde quem navega por leitor de tela. -->
          <div id="ilibras-widget-confirmacao" class="ilibras-widget-confirmacao" role="alertdialog"
               aria-labelledby="ilibras-widget-confirmacao-titulo"
               aria-describedby="ilibras-widget-confirmacao-texto" hidden>
            <h3 class="ilibras-widget-confirmacao-titulo" id="ilibras-widget-confirmacao-titulo">
              Você será redirecionado para o iLibras
            </h3>
            <p class="ilibras-widget-confirmacao-texto" id="ilibras-widget-confirmacao-texto"></p>
            <button type="button" id="ilibras-widget-confirmar" class="ilibras-widget-submit">
              Continuar para o iLibras
            </button>
            <button type="button" id="ilibras-widget-voltar" class="ilibras-widget-agendar">
              Voltar
            </button>
          </div>

          <!-- Estado do envio, anunciado sem roubar o foco de quem digita. Fica
               fora do formulário: escondido junto com ele durante o aviso de
               saída, o leitor de tela deixaria de anunciar o que acontece. -->
          <p class="ilibras-widget-status" id="ilibras-widget-status" role="status" aria-live="polite"></p>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    this.container = container;
    this.botao = container.querySelector('#ilibras-widget-button');
    this.logo = this.botao.querySelector('img');
    this.modal = container.querySelector('#ilibras-widget-modal');
    this.form = container.querySelector('#ilibras-widget-form');
    this.submit = container.querySelector('#ilibras-widget-submit');
    this.agendar = container.querySelector('#ilibras-widget-agendar');
    this.aviso = container.querySelector('#ilibras-widget-aviso');
    this.status = container.querySelector('#ilibras-widget-status');
    this.confirmacao = container.querySelector('#ilibras-widget-confirmacao');
    this.confirmacaoTexto = container.querySelector('#ilibras-widget-confirmacao-texto');
    this.confirmar = container.querySelector('#ilibras-widget-confirmar');
    this.voltar = container.querySelector('#ilibras-widget-voltar');
  }

  escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }

  attachEventListeners() {
    this.botao.addEventListener('click', () => this.toggleWidget());
    this.container.querySelector('#ilibras-widget-close')
      .addEventListener('click', () => this.closeWidget());

    // Esc fecha, Tab circula dentro do diálogo: o que se espera de qualquer
    // janela modal, e o que falta quando o foco escapa para a página atrás.
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        // Esc desfaz o passo mais recente, como em qualquer diálogo: no aviso
        // de saída, volta ao formulário em vez de fechar o widget inteiro e
        // jogar fora o nome que a pessoa acabou de digitar.
        if (!this.confirmacao.hidden) {
          if (!this.enviando) this.cancelarConfirmacao();
          return;
        }
        this.closeWidget();
        return;
      }
      if (e.key === 'Tab') this.prenderFoco(e);
    });

    // Validação ao sair do campo: o erro aparece perto de onde a pessoa
    // acabou de digitar, em vez de tudo de uma vez no envio.
    const nome = this.container.querySelector('#ilibras-name');
    nome.addEventListener('blur', () => {
      if (nome.value.trim() !== '') this.validarCampo('nome');
    });
    nome.addEventListener('input', () => this.limparErro('name'));

    this.container.querySelector('#ilibras-consent')
      .addEventListener('change', () => this.limparErro('consent'));

    this.form.addEventListener('submit', (e) => this.handleSubmit(e, 'fila'));

    if (this.agendar) {
      this.agendar.addEventListener('click', (e) => this.handleSubmit(e, 'agendamento'));
    }

    this.confirmar.addEventListener('click', () => this.confirmarRedirecionamento());
    this.voltar.addEventListener('click', () => this.cancelarConfirmacao());
  }

  prenderFoco(evento) {
    const focaveis = Array.from(this.modal.querySelectorAll(FOCAVEIS))
      .filter((el) => el.offsetParent !== null || el === document.activeElement);
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
    // Só depois de visível a transição tem o que animar.
    requestAnimationFrame(() => this.modal.classList.add('ilibras-widget-modal-open'));
    this.botao.classList.add('ilibras-widget-button-open');
    this.botao.setAttribute('aria-expanded', 'true');
    this.isOpen = true;

    // Marca de quando o formulário apareceu: o servidor usa para separar
    // quem digitou de quem disparou um POST.
    this.abertoEm = Date.now();

    this.container.querySelector('#ilibras-name').focus();
  }

  closeWidget() {
    // Quem fecha no meio do aviso e reabre depois encontra o formulário, não
    // uma pergunta sobre um envio que já não lembra de ter pedido.
    this.mostrarFormulario();

    this.modal.classList.remove('ilibras-widget-modal-open');
    this.botao.classList.remove('ilibras-widget-button-open');
    this.botao.setAttribute('aria-expanded', 'false');
    this.isOpen = false;

    // `hidden` só depois da transição, senão ela não chega a ser vista. E
    // enquanto o diálogo está escondido, nada dentro dele pode receber foco.
    window.setTimeout(() => {
      if (!this.isOpen) this.modal.hidden = true;
    }, 240);

    // Devolve o foco a quem abriu: sem isso ele volta para o início da
    // página e a pessoa perde o lugar onde estava.
    if (this.focoAnterior && document.contains(this.focoAnterior)) {
      this.focoAnterior.focus();
    } else {
      this.botao.focus();
    }
  }

  // ─── Tema ───────────────────────────────────────────────────────────────
  // O ícone flutua sobre o site, então quem decide a cor dele é o fundo do
  // site. O sistema entra por tabela: o site que segue o modo escuro do
  // computador escurece o próprio fundo, e é esse fundo que se lê aqui.

  observarTema() {
    this.aplicarTema();

    // Uma releitura por quadro, por mais mudanças que cheguem juntas.
    let quadro = null;
    const reler = () => {
      if (quadro !== null) return;
      quadro = requestAnimationFrame(() => {
        quadro = null;
        this.aplicarTema();
      });
    };

    // O botão de tema do site quase sempre troca uma classe ou um data-* no
    // <html> ou no <body>.
    const observador = new MutationObserver(reler);
    observador.observe(document.documentElement, { attributes: true });
    observador.observe(document.body, { attributes: true });

    // O sistema trocou de modo: o site pode ter trocado junto.
    const sistema = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (sistema) sistema.addEventListener('change', reler);

    // Site com transição no fundo: logo depois da troca de classe a cor ainda
    // é a antiga, e a leitura que vale é a do fim da transição.
    const fimDaTransicao = (e) => {
      if (e.target === document.body || e.target === document.documentElement) reler();
    };
    document.addEventListener('transitionend', fimDaTransicao);

    // O CSS do site pode terminar de chegar depois do widget.
    window.addEventListener('load', reler);

    this.pararDeObservarTema = () => {
      observador.disconnect();
      if (sistema) sistema.removeEventListener('change', reler);
      document.removeEventListener('transitionend', fimDaTransicao);
      window.removeEventListener('load', reler);
      if (quadro !== null) cancelAnimationFrame(quadro);
    };
  }

  /**
   * Para o site com botão de tema que o widget não percebe sozinho: 'claro' e
   * 'escuro' fixam o tema; 'auto' volta a ler o fundo do site.
   */
  definirTema(tema) {
    this.config.tema = tema;
    this.aplicarTema();
  }

  aplicarTema() {
    const tema = this.detectarTema();
    if (tema === this.temaAplicado) return;
    this.temaAplicado = tema;

    const escuro = tema === 'escuro';
    this.container.classList.toggle('ilibras-widget-tema-escuro', escuro);
    this.logo.src = escuro ? LOGO_ESCURO : LOGO;
  }

  detectarTema() {
    const { tema } = this.config;
    if (tema === 'claro' || tema === 'escuro') return tema;

    const cor = this.corDeFundoDaPagina();
    if (!cor) return 'claro';

    // Luminância relativa, a mesma da conta de contraste da WCAG. Abaixo de
    // 0,23 o branco contrasta mais com o fundo do que o azul da logo.
    const linear = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const [r, g, b] = cor;
    const luminancia = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);

    return luminancia < 0.23 ? 'escuro' : 'claro';
  }

  /**
   * A cor que de fato aparece atrás do widget: a tela-base do navegador com o
   * fundo do <html> e o do <body> por cima, transparência incluída.
   *
   * Quem faz a conta é um canvas de 1 pixel. Ele entende oklch(), lab() e o
   * que mais o navegador entender — e o navegador devolve a cor no formato em
   * que o site a escreveu, que nem sempre é rgb().
   *
   * @returns {number[]|null} [r, g, b], ou null quando não dá para ler
   */
  corDeFundoDaPagina() {
    const tela = document.createElement('canvas');
    tela.width = 1;
    tela.height = 1;
    const ctx = tela.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.fillStyle = this.telaBaseEscura() ? '#121212' : '#ffffff';
    ctx.fillRect(0, 0, 1, 1);

    for (const el of [document.documentElement, document.body]) {
      // Cor que o canvas não entende é ignorada, e ele repintaria a anterior.
      ctx.fillStyle = 'transparent';
      ctx.fillStyle = getComputedStyle(el).backgroundColor;
      ctx.fillRect(0, 0, 1, 1);
    }

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

    // A base é opaca, então o pixel também é. Se não veio opaco, quem
    // respondeu foi a proteção contra fingerprint do navegador, não a página.
    return a === 255 ? [r, g, b] : null;
  }

  /**
   * Sem fundo próprio, o site mostra a tela-base do navegador: branca, salvo
   * quando o site declara color-scheme escuro, no CSS ou na <meta>.
   */
  telaBaseEscura() {
    let esquema = getComputedStyle(document.documentElement).colorScheme || '';
    if (esquema === '' || esquema === 'normal') {
      const meta = document.querySelector('meta[name="color-scheme"]');
      esquema = meta ? meta.content : '';
    }

    if (!/\bdark\b/.test(esquema)) return false;

    // Só "dark": escura sempre. "light dark": a que o sistema preferir.
    return !/\blight\b/.test(esquema)
      || Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  // ─── Validação ──────────────────────────────────────────────────────────
  // Espelha as regras do servidor. Aqui é para avisar cedo e em português;
  // lá é onde a regra vale.

  valores() {
    return {
      nome: this.container.querySelector('#ilibras-name').value.trim().replace(/\s+/g, ' '),
      consentimento: this.container.querySelector('#ilibras-consent').checked,
      honeypot: this.container.querySelector('#ilibras-site-url').value
    };
  }

  erroDoCampo(campo, v) {
    if (campo === 'nome') {
      if (!v.nome) return 'Informe seu nome completo.';
      if (v.nome.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
      if (v.nome.length > 120) return 'O nome deve ter no máximo 120 caracteres.';
      if (!/^\p{L}[\p{L}\p{M}'’\-. ]*$/u.test(v.nome)) {
        return 'O nome deve conter apenas letras, espaços, apóstrofos e hífens.';
      }
      const palavras = v.nome.split(' ').filter((p) => p.replace(/[^\p{L}]/gu, '').length >= 2);
      if (palavras.length < 2) return 'Informe o nome completo (nome e sobrenome).';
      return null;
    }

    if (campo === 'consent' && !v.consentimento) {
      return 'É preciso aceitar para continuar.';
    }

    return null;
  }

  validarCampo(campo) {
    const erro = this.erroDoCampo(campo, this.valores());
    const id = { nome: 'name', consent: 'consent' }[campo];
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

    for (const [campo, id] of [['nome', 'name'], ['consent', 'consent']]) {
      const erro = this.erroDoCampo(campo, v);
      if (erro) {
        this.mostrarErro(id, erro);
        if (!primeiroInvalido) primeiroInvalido = this.container.querySelector('#ilibras-' + id);
      } else {
        this.limparErro(id);
      }
    }

    return primeiroInvalido;
  }

  mostrarErro(id, mensagem) {
    const campo = this.container.querySelector('#ilibras-' + id);
    const alvo = this.container.querySelector('#ilibras-' + id + '-erro');
    if (!alvo) return;
    alvo.textContent = mensagem;
    alvo.hidden = false;
    if (campo) {
      campo.setAttribute('aria-invalid', 'true');
      campo.classList.add('ilibras-widget-invalido');
    }
  }

  limparErro(id) {
    const campo = this.container.querySelector('#ilibras-' + id);
    const alvo = this.container.querySelector('#ilibras-' + id + '-erro');
    if (alvo) {
      alvo.textContent = '';
      alvo.hidden = true;
    }
    if (campo) {
      campo.removeAttribute('aria-invalid');
      campo.classList.remove('ilibras-widget-invalido');
    }
  }

  // ─── Avisos ─────────────────────────────────────────────────────────────

  mostrarAviso(mensagem, { fallback = false } = {}) {
    this.aviso.innerHTML = '';

    const texto = document.createElement('p');
    texto.className = 'ilibras-widget-aviso-texto';
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
    this.aviso.innerHTML = '';
  }

  /**
   * Plano de contingência: quando a API não responde, o atendimento não
   * precisa acabar aqui. Só aparece se o cliente configurou algum canal.
   */
  blocoFallback() {
    const { telefone, email, url, texto } = this.config.fallback;
    if (!telefone && !email && !url) return null;

    const bloco = document.createElement('div');
    bloco.className = 'ilibras-widget-fallback';

    const titulo = document.createElement('p');
    titulo.textContent = texto || 'Enquanto isso, você pode falar com a gente por aqui:';
    bloco.appendChild(titulo);

    const lista = document.createElement('ul');

    const canais = [
      telefone && { href: 'tel:' + String(telefone).replace(/[^\d+]/g, ''), rotulo: 'Telefone: ' + telefone },
      email && { href: 'mailto:' + email, rotulo: 'E-mail: ' + email },
      url && { href: url, rotulo: 'Outra forma de atendimento', externo: true }
    ].filter(Boolean);

    for (const canal of canais) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = canal.href;
      link.textContent = canal.rotulo;
      if (canal.externo) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Abrir em nova aba sem avisar desorienta quem usa leitor de tela.
        const nota = document.createElement('span');
        nota.className = 'ilibras-widget-sr-only';
        nota.textContent = ' (abre em nova aba)';
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
  async handleSubmit(e, modo = 'fila') {
    e.preventDefault();

    // Barra o clique duplo e o envio em rajada — antes do servidor precisar
    // barrar, e sem custar nada a quem só clicou duas vezes sem querer.
    if (this.enviando) return;

    this.limparAviso();

    if (!this.config.token) {
      this.mostrarAviso(
        'Este atendimento não está configurado corretamente. Avise o responsável pelo site.',
        { fallback: true }
      );
      return;
    }

    const invalido = this.validarTudo();
    if (invalido) {
      this.anunciar('O formulário tem campos a corrigir.');
      invalido.focus();
      return;
    }

    if (this.config.confirmarRedirecionamento) {
      this.pedirConfirmacao(modo);
      return;
    }

    await this.criarAtendimento(modo);
  }

  // ─── Aviso de saída ─────────────────────────────────────────────────────

  /**
   * Troca o formulário pelo aviso de que a pessoa vai para o iLibras. Nada é
   * enviado ainda: o atendimento só nasce no "Continuar".
   */
  pedirConfirmacao(modo) {
    this.modoPendente = modo;

    this.confirmacaoTexto.textContent = modo === 'agendamento'
      ? 'O agendamento é feito no site do iLibras, que abre em uma nova aba. Lá você escolhe o dia e o horário da conversa.'
      : 'O atendimento em Libras acontece no site do iLibras, que abre em uma nova aba. Lá você entra na fila e aguarda um intérprete.';
    this.confirmar.textContent = 'Continuar para o iLibras';

    this.form.hidden = true;
    this.confirmacao.hidden = false;
    this.anunciar('');

    // O foco vai para a ação principal. Entrar num alertdialog faz o leitor
    // de tela ler título e texto antes do botão, então o aviso não passa batido.
    this.confirmar.focus();
  }

  /** "Voltar": o formulário reaparece como estava, com o nome digitado. */
  cancelarConfirmacao() {
    if (this.enviando) return;

    const modo = this.modoPendente;
    this.mostrarFormulario();

    // O foco volta para o botão que a pessoa tinha apertado, não para o topo.
    const origem = modo === 'agendamento' && this.agendar ? this.agendar : this.submit;
    origem.focus();
  }

  mostrarFormulario() {
    this.modoPendente = null;
    this.confirmacao.hidden = true;
    this.form.hidden = false;
  }

  async confirmarRedirecionamento() {
    if (this.enviando || !this.modoPendente) return;

    // A aba é aberta AQUI, ainda dentro do clique, e só depois recebe o
    // endereço. window.open depois de um await já não conta como gesto do
    // usuário, e é aí que o bloqueador de pop-up costuma agir — antes deste
    // aviso, o widget contornava isso trocando a página da aba atual.
    const aba = this.reservarAba();

    await this.criarAtendimento(this.modoPendente, aba);
  }

  /**
   * Abre uma aba em branco para receber o iLibras assim que o atendimento
   * existir. Devolve null quando o navegador barra — aí vale o caminho antigo.
   */
  reservarAba() {
    let aba = null;
    try {
      aba = window.open('', '_blank');
    } catch (e) {
      aba = null;
    }
    if (!aba) return null;

    // A aba nova não precisa (e não deve) alcançar o site do cliente. É a
    // mesma proteção de 'noopener', sem o efeito colateral de window.open
    // devolver null — ver o comentário em irPara().
    aba.opener = null;

    // Enquanto o cadastro não volta, a aba diz o que está acontecendo em vez
    // de ficar em branco.
    try {
      const doc = aba.document;
      doc.title = 'Abrindo o iLibras…';
      doc.documentElement.lang = 'pt-BR';
      doc.body.style.cssText = 'font:16px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;padding:32px;color:#073657';
      doc.body.textContent = 'Abrindo o iLibras…';
    } catch (e) {
      // Aba sem documento acessível: segue em branco, e tudo bem.
    }

    return aba;
  }

  /**
   * Leva a pessoa ao endereço devolvido pelo iLibras: na aba reservada quando
   * ela existe, numa aba nova quando não, e na atual como último recurso.
   */
  irPara(destino, abaReservada) {
    if (abaReservada && !abaReservada.closed) {
      abaReservada.location.href = destino;
      return;
    }

    // window.open depois de await pode cair no bloqueador de pop-up. Se
    // cair, a mesma aba leva — melhor trocar de página do que sumir com o
    // atendimento que já foi criado.
    //
    // Sem a feature 'noopener' de propósito: com ela, a especificação manda
    // window.open devolver null MESMO quando a aba abre. O teste abaixo lia
    // esse null como pop-up bloqueado e navegava a aba atual também — a
    // pessoa ficava com duas. Anular `opener` na mão dá a mesma proteção e
    // preserva o retorno, que é o que distingue aba aberta de aba barrada.
    const aba = window.open(destino, '_blank');

    if (aba) {
      aba.opener = null;
    } else {
      window.location.assign(destino);
    }
  }

  // ─── Criação do atendimento ─────────────────────────────────────────────

  async criarAtendimento(modo, abaReservada = null) {
    const v = this.valores();

    const corpo = new FormData();
    corpo.append('nome', v.nome);
    corpo.append('site_url', v.honeypot);
    corpo.append('iniciado_em', String(this.abertoEm || Date.now()));
    corpo.append('modo', modo);

    this.travarEnvio(true, modo);

    try {
      const resultado = await this.enviarComRetentativa(corpo);
      const destino = resultado.link_fila || resultado.link || resultado.url || resultado.redirect;

      if (!destino) throw new FalhaDeServico('resposta_inesperada');

      this.anunciar(modo === 'agendamento'
        ? 'Cadastro feito. Abrindo o calendário para escolher data e horário.'
        : 'Atendimento criado. Abrindo a sala de atendimento.');

      this.irPara(destino, abaReservada);

      this.form.reset();
      this.closeWidget();
    } catch (erro) {
      // A aba reservada não tem para onde ir: fechá-la devolve a pessoa a
      // esta página, onde a explicação do que houve está esperando.
      if (abaReservada && !abaReservada.closed) {
        try { abaReservada.close(); } catch (e) { /* já fechada */ }
      }

      // O erro pode ser de validação do nome, e o campo mora no formulário.
      this.mostrarFormulario();
      this.tratarFalha(erro);
    } finally {
      // O mesmo modo da ida: sem ele, destravar devolveria o texto ao botão
      // errado e o acionado ficaria em "Enviando..." para sempre.
      this.travarEnvio(false, modo);
    }
  }

  travarEnvio(travado, modo = 'fila') {
    this.enviando = travado;

    // Todos os botões de envio saem de cena: enquanto um cadastro está em
    // curso, qualquer outro caminho criaria um segundo atendimento para a
    // mesma pessoa — e "Voltar" mostraria o formulário de um envio em curso.
    for (const botao of [this.submit, this.agendar, this.confirmar, this.voltar]) {
      if (botao) botao.disabled = travado;
    }

    // Só o botão acionado muda de texto e recebe aria-busy — dizer que o
    // outro está ocupado seria mentira para quem usa leitor de tela.
    let ativo;
    let rotulo;
    if (!this.confirmacao.hidden) {
      ativo = this.confirmar;
      rotulo = 'Continuar para o iLibras';
    } else {
      const usouAgendar = modo === 'agendamento' && this.agendar;
      ativo = usouAgendar ? this.agendar : this.submit;
      rotulo = usouAgendar ? this.config.scheduleButtonText : this.config.buttonText;
    }

    ativo.setAttribute('aria-busy', travado ? 'true' : 'false');
    ativo.textContent = travado ? 'Enviando...' : rotulo;

    // No caminho de falha o formulário volta antes de destravar, e o texto do
    // botão de confirmar ficaria em "Enviando..." para a próxima vez.
    if (!travado) {
      this.confirmar.setAttribute('aria-busy', 'false');
      this.confirmar.textContent = 'Continuar para o iLibras';
    }

    if (travado) this.anunciar('Enviando seus dados. Aguarde.');
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

        const vaiRepetir = erro instanceof FalhaDeServico
          && ['rede', 'timeout', 'servidor'].includes(erro.tipo)
          && tentativa < this.config.tentativas;

        if (!vaiRepetir) break;

        this.anunciar('O serviço não respondeu. Tentando novamente...');
        await new Promise((r) => window.setTimeout(r, 1200 * tentativa));
      }
    }

    throw ultimaFalha;
  }

  async enviar(corpo) {
    if (navigator.onLine === false) throw new FalhaDeServico('offline');

    // AbortController é o que dá prazo à requisição: sem ele, uma API que
    // aceita a conexão e nunca responde deixa a pessoa no "Enviando..."
    // até ela desistir.
    const controle = new AbortController();
    const prazo = window.setTimeout(() => controle.abort(), this.config.timeoutMs);

    let resposta;
    try {
      resposta = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.config.token}`, Accept: 'application/json' },
        body: corpo,
        signal: controle.signal
      });
    } catch (erro) {
      throw new FalhaDeServico(erro && erro.name === 'AbortError' ? 'timeout' : 'rede');
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
      throw new FalhaDeServico('limite', {
        mensagem: dados && dados.message,
        esperarSegundos: parseInt(resposta.headers.get('Retry-After') || '0', 10)
      });
    }

    if (resposta.status === 422) {
      throw new FalhaDeServico('validacao', {
        mensagem: dados && dados.message,
        erros: (dados && dados.errors) || null
      });
    }

    if (resposta.status === 401 || resposta.status === 403) {
      throw new FalhaDeServico('autorizacao');
    }

    if (resposta.status >= 500) throw new FalhaDeServico('servidor');

    throw new FalhaDeServico('desconhecido', { mensagem: dados && dados.message });
  }

  /**
   * Traduz a falha para quem está esperando atendimento. O detalhe técnico
   * vai para o console; a tela recebe o que a pessoa pode fazer a respeito.
   */
  tratarFalha(erro) {
    const tipo = erro instanceof FalhaDeServico ? erro.tipo : 'desconhecido';

    if (tipo === 'validacao' && erro.detalhe.erros) {
      const mapa = { nome: 'name' };
      let primeiro = null;
      for (const [campo, mensagens] of Object.entries(erro.detalhe.erros)) {
        const id = mapa[campo];
        if (!id) continue;
        this.mostrarErro(id, Array.isArray(mensagens) ? mensagens[0] : String(mensagens));
        if (!primeiro) primeiro = this.container.querySelector('#ilibras-' + id);
      }
      this.anunciar('O formulário tem campos a corrigir.');
      if (primeiro) primeiro.focus();
      else this.mostrarAviso(erro.detalhe.mensagem || 'Verifique os dados informados.');
      return;
    }

    const mensagens = {
      offline: 'Você parece estar sem conexão com a internet. Verifique a rede e tente novamente.',
      rede: 'Não conseguimos falar com o serviço de atendimento. Verifique sua conexão e tente novamente.',
      timeout: 'O serviço de atendimento demorou para responder. Tente novamente em instantes.',
      servidor: 'O serviço de atendimento está indisponível no momento. Já estamos avisados — tente novamente em alguns minutos.',
      autorizacao: 'Este atendimento não está configurado corretamente. Avise o responsável pelo site.',
      limite: erro.detalhe.mensagem || 'Muitas solicitações seguidas. Aguarde um instante e tente novamente.',
      validacao: erro.detalhe.mensagem || 'Verifique os dados informados.',
      resposta_inesperada: 'O serviço respondeu de forma inesperada. Tente novamente em instantes.',
      desconhecido: 'Não foi possível iniciar o atendimento agora. Tente novamente em instantes.'
    };

    // Só oferece o canal alternativo quando o problema é do serviço: em erro
    // de digitação, mandar a pessoa ligar não ajuda.
    const problemaDeServico = ['offline', 'rede', 'timeout', 'servidor', 'autorizacao', 'resposta_inesperada', 'desconhecido'].includes(tipo);

    this.mostrarAviso(mensagens[tipo] || mensagens.desconhecido, { fallback: problemaDeServico });
    this.anunciar('');

    // O aviso já foi anunciado por role="alert"; o foco vai para ele para
    // que quem navega por teclado leia e siga a partir dali.
    this.aviso.setAttribute('tabindex', '-1');
    this.aviso.focus();

    if (console && console.error) console.error('[iLibras] falha ao criar atendimento:', tipo, erro);
  }

  destroy() {
    if (this.pararDeObservarTema) this.pararDeObservarTema();
    if (this.container) this.container.remove();
    const styles = document.getElementById('ilibras-widget-styles');
    if (styles) styles.remove();
  }
}

/** Falha com causa identificada, para a tela poder dizer o que houve. */
class FalhaDeServico extends Error {
  constructor(tipo, detalhe = {}) {
    super('iLibras: ' + tipo);
    this.name = 'FalhaDeServico';
    this.tipo = tipo;
    this.detalhe = detalhe;
  }
}

export { ILibrasWidget, FalhaDeServico };
export default ILibrasWidget;
