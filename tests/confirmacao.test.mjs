/**
 * Aviso antes de sair do site (v1.6.0).
 *
 * O widget avisa que a pessoa vai para o iLibras e só cria o atendimento
 * depois do "Continuar". Estes testes fixam as três promessas que importam:
 *
 * - nada é enviado antes da confirmação — senão quem desiste deixa um
 *   atendimento órfão na fila, com o alarme dos intérpretes tocando;
 * - a aba nova é aberta dentro do clique, ANTES da requisição — depois de um
 *   await o bloqueador de pop-up costuma agir;
 * - falha devolve a pessoa ao formulário e fecha a aba que ficou sem destino.
 *
 * Rodam contra a build publicada no npm, com DOM, rede e janelas simuladas:
 * é o comportamento do que vai para o site do cliente, não do fonte.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { ILibrasWidget } from '../dist/ilibras-widget.mjs';

const DESTINO = 'https://sistema.ilibras.com.br/fila?codigo=abc';

let foco;
let chamadasFetch;
let ordem;
let atribuido;

/** Elemento mínimo: só o que o widget toca nestes caminhos. */
function elemento(extra = {}) {
    return {
        hidden: false,
        disabled: false,
        textContent: '',
        atributos: {},
        focus() { foco = this; },
        setAttribute(k, v) { this.atributos[k] = v; },
        removeAttribute(k) { delete this.atributos[k]; },
        ...extra,
    };
}

function resposta(status, dados) {
    return {
        ok: status < 400,
        status,
        json: async () => dados,
        headers: { get: () => null },
    };
}

function abaFalsa() {
    return {
        closed: false,
        opener: 'site-do-cliente',
        location: { href: '' },
        document: { title: '', documentElement: {}, body: { style: {}, textContent: '' } },
        close() { this.closed = true; },
    };
}

/**
 * Widget sem DOM real: a instância nasce do protótipo e recebe os elementos
 * simulados. Validação e tratamento de falha são substituídos por registros —
 * aqui o assunto é o fluxo, não a mensagem.
 */
function montarWidget(config = {}) {
    const w = Object.create(ILibrasWidget.prototype);
    w.config = {
        token: 'token-de-teste',
        apiUrl: 'https://sistema.ilibras.com.br/api/public/widget/cadastrar',
        timeoutMs: 1000,
        tentativas: 1,
        buttonText: 'Iniciar atendimento em Libras',
        scheduleButtonText: 'Agendar uma conversa',
        confirmarRedirecionamento: true,
        fallback: {},
        ...config,
    };
    w.enviando = false;
    w.abertoEm = Date.now() - 10000;
    w.modoPendente = null;

    w.form = elemento({ reset() { this.resetado = true; } });
    w.submit = elemento();
    w.agendar = elemento();
    w.confirmacao = elemento({ hidden: true });
    w.confirmacaoTexto = elemento();
    w.confirmar = elemento();
    w.voltar = elemento();
    w.status = elemento();

    w.validarTudo = () => null;
    w.valores = () => ({ nome: 'Maria da Silva', consentimento: true, honeypot: '' });
    w.limparAviso = () => {};
    w.closeWidget = function () { this.fechado = true; this.mostrarFormulario(); };
    w.tratarFalha = function (erro) { this.falha = erro; };

    return w;
}

const clique = { preventDefault() {} };

beforeEach(() => {
    foco = null;
    chamadasFetch = 0;
    ordem = [];
    atribuido = null;

    globalThis.window = {
        open: () => null,
        setTimeout: globalThis.setTimeout,
        clearTimeout: globalThis.clearTimeout,
        location: { assign(url) { atribuido = url; } },
    };
    globalThis.fetch = async () => {
        chamadasFetch++;
        ordem.push('fetch');
        return resposta(200, { link_fila: DESTINO });
    };
});

test('o botão de iniciar mostra o aviso e não envia nada', async () => {
    const w = montarWidget();

    await w.handleSubmit(clique, 'fila');

    assert.equal(chamadasFetch, 0, 'o atendimento foi criado antes da confirmação');
    assert.equal(w.confirmacao.hidden, false, 'o aviso não apareceu');
    assert.equal(w.form.hidden, true, 'o formulário continuou por baixo do aviso');
    assert.equal(foco, w.confirmar, 'o foco não foi para a ação principal do aviso');
    assert.match(w.confirmacaoTexto.textContent, /iLibras/);
    assert.match(w.confirmacaoTexto.textContent, /fila/, 'o texto não diz o que acontece lá');
});

test('o botão de agendar também avisa, com o texto do agendamento', async () => {
    const w = montarWidget();

    await w.handleSubmit(clique, 'agendamento');

    assert.equal(chamadasFetch, 0);
    assert.equal(w.confirmacao.hidden, false);
    assert.match(w.confirmacaoTexto.textContent, /dia e o horário/);
});

test('voltar desfaz o aviso sem criar atendimento', async () => {
    const w = montarWidget();

    await w.handleSubmit(clique, 'agendamento');
    w.cancelarConfirmacao();

    assert.equal(chamadasFetch, 0, 'voltar criou atendimento');
    assert.equal(w.confirmacao.hidden, true);
    assert.equal(w.form.hidden, false, 'o formulário não voltou');
    assert.equal(w.modoPendente, null);
    assert.equal(foco, w.agendar, 'o foco não voltou ao botão que a pessoa tinha apertado');
});

test('continuar abre a aba antes da requisição e depois a leva ao iLibras', async () => {
    const aba = abaFalsa();
    globalThis.window.open = (url, alvo) => {
        ordem.push('open:' + JSON.stringify(url) + ':' + alvo);
        return aba;
    };

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    await w.confirmarRedirecionamento();

    assert.deepEqual(
        ordem,
        ['open:"":_blank', 'fetch'],
        'a aba precisa ser aberta dentro do clique, antes do await — depois dele o pop-up é barrado',
    );
    assert.equal(aba.opener, null, 'a aba nova ficou com referência ao site do cliente');
    assert.equal(aba.location.href, DESTINO, 'a aba reservada não foi levada ao iLibras');
    assert.equal(atribuido, null, 'a aba atual navegou também — a pessoa ficaria com duas');
    assert.equal(chamadasFetch, 1);
    assert.ok(w.fechado, 'o widget não fechou depois de criar o atendimento');
    assert.ok(w.form.resetado, 'o formulário não foi limpo');
});

test('a aba reservada mostra que está abrindo, em vez de ficar em branco', async () => {
    const aba = abaFalsa();
    globalThis.window.open = () => aba;

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    await w.confirmarRedirecionamento();

    assert.match(aba.document.body.textContent, /Abrindo o iLibras/);
    assert.equal(aba.document.documentElement.lang, 'pt-BR');
});

test('falha fecha a aba reservada e devolve a pessoa ao formulário', async () => {
    const aba = abaFalsa();
    globalThis.window.open = () => aba;
    globalThis.fetch = async () => {
        chamadasFetch++;
        return resposta(500, {});
    };

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    await w.confirmarRedirecionamento();

    assert.equal(aba.closed, true, 'a aba ficou aberta, em branco, sem destino');
    assert.equal(w.form.hidden, false, 'o formulário não voltou para mostrar o erro');
    assert.equal(w.confirmacao.hidden, true);
    assert.equal(w.falha?.tipo, 'servidor', 'a falha não chegou ao tratamento');
    assert.equal(w.enviando, false, 'o widget ficou travado em "Enviando..."');
    assert.equal(w.confirmar.textContent, 'Continuar para o iLibras', 'o botão de confirmar ficou em "Enviando..."');
    assert.equal(w.submit.disabled, false, 'o botão de iniciar ficou desabilitado');
});

test('pop-up bloqueado de vez: a aba atual leva ao iLibras', async () => {
    // O navegador barra até a aba aberta dentro do clique.
    globalThis.window.open = () => null;

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    await w.confirmarRedirecionamento();

    assert.equal(atribuido, DESTINO, 'o atendimento foi criado e a pessoa não foi levada a ele');
});

test('clique duplo em continuar cria um atendimento só', async () => {
    let abertas = 0;
    globalThis.window.open = () => { abertas++; return abaFalsa(); };

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    await Promise.all([w.confirmarRedirecionamento(), w.confirmarRedirecionamento()]);

    assert.equal(chamadasFetch, 1, 'o segundo clique criou outro atendimento');
    assert.equal(abertas, 1, 'o segundo clique abriu outra aba');
});

test('voltar não funciona com o envio em curso', async () => {
    let liberar;
    globalThis.window.open = () => abaFalsa();
    globalThis.fetch = () => {
        chamadasFetch++;
        return new Promise((r) => { liberar = () => r(resposta(200, { link_fila: DESTINO })); });
    };

    const w = montarWidget();
    await w.handleSubmit(clique, 'fila');
    const envio = w.confirmarRedirecionamento();

    w.cancelarConfirmacao();
    assert.equal(w.confirmacao.hidden, false, 'voltar mostrou o formulário de um envio em andamento');
    assert.equal(w.voltar.disabled, true, 'o botão de voltar continuou ativo durante o envio');

    liberar();
    await envio;
});

test('com confirmarRedirecionamento: false, o botão cria direto como antes', async () => {
    const aba = abaFalsa();
    globalThis.window.open = (url) => { ordem.push('open:' + url); return aba; };

    const w = montarWidget({ confirmarRedirecionamento: false });
    await w.handleSubmit(clique, 'fila');

    assert.equal(w.confirmacao.hidden, true, 'o aviso apareceu mesmo desligado');
    assert.equal(chamadasFetch, 1);
    assert.deepEqual(ordem, ['fetch', 'open:' + DESTINO], 'o caminho antigo deixou de abrir o destino direto');
    assert.equal(aba.opener, null);
});
