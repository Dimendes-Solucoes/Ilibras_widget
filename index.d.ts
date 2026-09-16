/**
 * iLibras Widget — tipos.
 *
 * Escritos à mão: o pacote é JavaScript puro e não vale arrastar um
 * compilador TypeScript para dentro dele só para gerar isto.
 */

/** Canais alternativos, mostrados quando a API não responde. */
export interface ILibrasFallback {
    telefone?: string;
    email?: string;
    url?: string;
    /** Frase acima da lista. Padrão: "Enquanto isso, você pode falar com a gente por aqui:". */
    texto?: string;
}

export interface ILibrasConfig {
    /** Token de autenticação do contrato. **Obrigatório** — sem ele o widget não envia nada. */
    token: string;

    /** Canto da tela. Padrão: `'bottom-right'`. */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

    /** Título do cabeçalho. Padrão: `'iLibras'`. */
    title?: string;

    /** Mensagem de boas-vindas. */
    message?: string;

    /** Texto do botão que leva à fila ao vivo. Padrão: `'Iniciar atendimento em Libras'`. */
    buttonText?: string;

    /**
     * Mostra o botão que leva direto à escolha de data e horário, sem passar
     * pela fila ao vivo. Padrão: `true`.
     *
     * Deixe `false` no site que só atende ao vivo — um botão que leva a uma
     * agenda que ninguém cobre é pior do que não ter o botão.
     */
    agendamento?: boolean;

    /** Texto do botão de agendamento. Padrão: `'Agendar uma conversa'`. */
    scheduleButtonText?: string;

    /** Empilhamento. Padrão: `9999`. */
    zIndex?: number;

    /** Endpoint de cadastro. Troque apenas para apontar a um ambiente de homologação. */
    apiUrl?: string;

    /** Prazo de cada tentativa, em milissegundos. Padrão: `15000`. */
    timeoutMs?: number;

    /**
     * Quantas vezes tentar quando a falha é de rede ou do servidor. Padrão: `2`.
     * Erro de validação e limite de uso nunca são repetidos.
     */
    tentativas?: number;

    fallback?: ILibrasFallback;

    /** @deprecated Sem efeito. Mantido para não quebrar configuração existente. */
    redirectUrl?: string;

    /** @deprecated Sem efeito. Mantido para não quebrar configuração existente. */
    primaryColor?: string;
}

/** Falha com causa identificada, para a tela poder dizer o que houve. */
export declare class FalhaDeServico extends Error {
    readonly name: 'FalhaDeServico';
    readonly tipo:
        | 'offline'
        | 'rede'
        | 'timeout'
        | 'servidor'
        | 'autorizacao'
        | 'limite'
        | 'validacao'
        | 'resposta_inesperada'
        | 'desconhecido';
    readonly detalhe: {
        mensagem?: string;
        erros?: Record<string, string | string[]> | null;
        esperarSegundos?: number;
    };
}

export declare class ILibrasWidget {
    constructor(config: ILibrasConfig);

    readonly isOpen: boolean;

    openWidget(): void;
    closeWidget(): void;
    toggleWidget(): void;

    /**
     * Remove o widget e o estilo da página.
     *
     * Em React, Vue e Angular, chame na desmontagem: sem isso cada montagem
     * deixa um widget para trás e o site acumula botões flutuantes.
     */
    destroy(): void;
}

export default ILibrasWidget;

declare global {
    interface Window {
        /** Disponível na build de `<script src>`. */
        ILibrasWidget?: typeof ILibrasWidget;
        /** Preenchida antes do `<script>` para o widget se criar sozinho. */
        iLibrasWidgetConfig?: ILibrasConfig;
        /** A instância criada a partir de `iLibrasWidgetConfig`. */
        iLibrasWidgetInstance?: ILibrasWidget;
    }
}
