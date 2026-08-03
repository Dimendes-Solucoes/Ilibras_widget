# iLibras Widget — Guia de Integração

**Guia oficial de instalação e uso do widget de atendimento em Libras para o seu site**

| | |
|---|---|
| **Versão do widget documentada** | 1.1.0 |
| **Versão deste guia** | 1.0 — 31/07/2026 |
| **Público-alvo** | Equipe de TI, desenvolvimento ou marketing responsável pelo site |
| **Suporte** | suporte@ilibras.com.br |

---

## Sumário

1. [O que é o iLibras Widget](#1-o-que-é-o-ilibras-widget)
2. [Como funciona](#2-como-funciona)
3. [Antes de começar: solicitando seu token](#3-antes-de-começar-solicitando-seu-token)
4. [Arquivos do pacote](#4-arquivos-do-pacote)
5. [Instalação passo a passo](#5-instalação-passo-a-passo)
6. [Instalação por plataforma](#6-instalação-por-plataforma)
7. [Opções de configuração](#7-opções-de-configuração)
8. [Campos do formulário e validações](#8-campos-do-formulário-e-validações)
9. [Integração com a API — o que acontece nos bastidores](#9-integração-com-a-api--o-que-acontece-nos-bastidores)
10. [Aparência e personalização visual](#10-aparência-e-personalização-visual)
11. [Compatibilidade](#11-compatibilidade)
12. [Segurança e privacidade dos dados](#12-segurança-e-privacidade-dos-dados)
13. [Solução de problemas](#13-solução-de-problemas)
14. [Checklist final antes de publicar](#14-checklist-final-antes-de-publicar)
15. [Suporte e contato](#15-suporte-e-contato)

---

## 1. O que é o iLibras Widget

O **iLibras Widget** é um botão flutuante embarcável que você adiciona ao seu site para oferecer, a qualquer visitante, a possibilidade de solicitar atendimento em **Libras (Língua Brasileira de Sinais)**.

Funciona de forma independente de plataforma: basta inserir um trecho de código no HTML do site. Não é necessário desenvolver nenhuma integração de backend — toda a comunicação com a API iLibras é feita automaticamente pelo próprio widget.

**Resumo do que o widget faz:**

- Exibe um botão flutuante fixo (canto da tela) em todas as páginas onde for instalado.
- Ao clicar, abre um formulário curto (Nome, CPF, Telefone + aceite).
- Valida os dados no próprio navegador antes de enviar.
- Envia os dados de forma segura (POST) para a API da iLibras.
- Abre o atendimento em **Libras** em uma nova aba, sem tirar o visitante do site.

**O que a sua equipe *não* precisa fazer:**

- Não é necessário criar nenhum endpoint, banco de dados ou lógica de backend.
- Não é necessário processar ou armazenar os dados do formulário — isso é feito pela iLibras.
- Não é necessário nenhum framework específico: funciona em HTML puro, WordPress, React, Vue, Angular, Next.js, Joomla, Drupal, entre outros.

---

## 2. Como funciona

Fluxo completo, do clique do visitante até o início do atendimento:

```
 1. Visitante clica no botão flutuante do widget
                    │
                    ▼
 2. Modal abre com o formulário (Nome, CPF, Telefone, aceite)
                    │
                    ▼
 3. Visitante preenche e clica em "Iniciar atendimento"
                    │
                    ▼
 4. Widget valida os dados no navegador
    (nome ≥ 3 caracteres · CPF com dígito verificador · telefone 10-11 dígitos · aceite marcado)
                    │
                    ▼
 5. Dados enviados via POST (multipart/form-data) para a API iLibras,
    junto com o token de autenticação do seu site
                    │
                    ▼
 6. API responde com um link de atendimento (link_fila)
                    │
                    ▼
 7. O link abre automaticamente em uma NOVA ABA do navegador
                    │
                    ▼
 8. O modal do widget fecha sozinho — o visitante permanece na página
    original, e o atendimento em Libras continua na aba nova
```

**Por que isso importa para o seu site:** o visitante nunca perde o contexto de navegação. Ele pode continuar no seu site enquanto o atendimento acontece em outra aba.

---

## 3. Antes de começar: solicitando seu token

O widget **não funciona sem um token de autenticação**. O token identifica o seu site perante a API da iLibras e é obrigatório em toda instalação.

### Como solicitar

Entre em contato com a equipe iLibras informando:

- Nome da empresa
- Domínio do site onde o widget será instalado (ex: `www.suaempresa.com.br`)
- CNPJ/CPF (para identificação)
- E-mail de contato

Canais para solicitação:

- **E-mail:** contato@ilibras.com.br
- **Portal do Cliente:** https://sistema.ilibras.com.br

Você receberá um token único (ex.: `a1b2c3d4e5f6...`) por e-mail, junto com as instruções de instalação.

> ⚠️ **Importante:** tokens são vinculados ao domínio informado no pedido. Se o widget for instalado em mais de um domínio (ex.: site institucional + loja virtual), solicite um token para cada um.

### Boas práticas com o token

| Faça | Não faça |
|---|---|
| Guarde o token em local seguro | Não publique o token em repositórios públicos |
| Use HTTPS no site de produção | Não reutilize o mesmo token em domínios diferentes |
| Informe o domínio correto no pedido | Não compartilhe o token fora da sua equipe técnica |

Se o token for exposto acidentalmente, contate o suporte para revogação e emissão de um novo.

---

## 4. Arquivos do pacote

A instalação depende de **três arquivos**, fornecidos pela equipe iLibras:

| Arquivo | Função |
|---|---|
| `ilibras-widget.js` | Lógica do widget (formulário, validação, envio, comportamento) |
| `ilibras-widget.css` | Estilo visual do widget |
| `ilibras-LOGO.svg` | Ícone exibido no botão flutuante e no cabeçalho do formulário |

### ⚠️ Atenção especial ao arquivo `ilibras-LOGO.svg`

Diferente do CSS (que é localizado automaticamente pelo widget a partir do endereço do próprio script), o ícone é carregado usando um caminho **relativo à página atual** do seu site. Ou seja, o navegador procura o arquivo `ilibras-LOGO.svg` a partir da pasta/URL onde a página está, e não a partir de onde o script foi carregado.

**Na prática:**

- Se o widget for adicionado apenas na página inicial (`https://suaempresa.com.br/`), colocar `ilibras-LOGO.svg` na raiz do site resolve o problema.
- Se o widget for exibido em várias páginas/rotas (o caso mais comum — WordPress, blogs, aplicações React/Vue com múltiplas rotas), o arquivo pode não ser encontrado nessas páginas, e o ícone aparecerá quebrado.

**Isso não impede o funcionamento do widget** — o botão, o formulário e o envio de dados continuam funcionando normalmente mesmo com o ícone quebrado. É uma questão puramente visual.

**Recomendações para evitar o problema, em ordem de robustez:**

1. **Regra de reescrita no servidor (recomendado):** configure seu servidor para sempre responder ao caminho `ilibras-LOGO.svg`, em qualquer pasta, com o mesmo arquivo físico.

   - **Apache (`.htaccess`):**
     ```apache
     RewriteEngine On
     RewriteRule ^.*ilibras-LOGO\.svg$ /caminho/para/ilibras-LOGO.svg [L]
     ```
   - **Nginx:**
     ```nginx
     location ~ ilibras-LOGO\.svg$ {
         alias /caminho/para/ilibras-LOGO.svg;
     }
     ```

2. **Alternativa simples:** instale o widget apenas em páginas de primeiro nível (ex.: `/`, `/contato`), evitando rotas profundamente aninhadas.

3. Se preferir, nossa equipe pode orientar uma pequena ajuste no carregamento do ícone para eliminar essa limitação — fale com o suporte técnico.

---

## 5. Instalação passo a passo

### Passo 1 — Receba os arquivos

Você receberá (ou pode copiar deste pacote):

- `ilibras-widget.js`
- `ilibras-widget.css`
- `ilibras-LOGO.svg`

Hospede os três no seu servidor (mesma pasta, de preferência).

### Passo 2 — Adicione o código ao site

Insira o trecho abaixo **antes do fechamento da tag `</body>`**, em todas as páginas onde o widget deve aparecer (ou em um template global, como rodapé/footer):

```html
<!-- iLibras Widget -->
<link rel="stylesheet" href="ilibras-widget.css">
<script src="ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    token: 'SEU_TOKEN_AQUI'   // obrigatório — fornecido pela equipe iLibras
  });
</script>
```

> ⚠️ Substitua `SEU_TOKEN_AQUI` pelo token recebido no passo 3. Sem ele, o widget exibe um erro e não envia dados.

### Passo 3 — Teste

1. Abra o site no navegador.
2. Verifique se o botão flutuante aparece no canto configurado (padrão: inferior direito).
3. Clique no botão e confira se o formulário abre.
4. Preencha com dados de teste válidos e envie.
5. Confirme que uma nova aba abre com o link de atendimento e que o formulário fecha sozinho.

Pronto — a instalação básica está concluída.

---

## 6. Instalação por plataforma

### HTML estático / sites institucionais

Use exatamente o trecho do Passo 2 acima, antes de `</body>`.

### WordPress

**Opção recomendada — via `footer.php` do tema:**

1. Envie os 3 arquivos para `/wp-content/themes/SEU-TEMA/ilibras-widget/`.
2. Edite `footer.php` (Aparência → Editor de Temas) e adicione antes de `</body>`:

```php
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/ilibras-widget/ilibras-widget.css">
<script src="<?php echo get_template_directory_uri(); ?>/ilibras-widget/ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    token: 'SEU_TOKEN_AQUI'
  });
</script>
```

**Alternativa sem mexer no tema:** use um plugin como *Insert Headers and Footers* e cole o mesmo trecho no campo "Footer".

> 📎 Um guia detalhado com 4 métodos de instalação no WordPress (incluindo plugin dedicado e ajuste de Content Security Policy) está disponível sob pedido com o suporte iLibras.

### React / Vue / Angular / Next.js (SPAs)

Carregue os arquivos dinamicamente ao montar o componente principal:

```jsx
useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/ilibras-widget.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = '/ilibras-widget.js';
  script.onload = () => {
    new window.ILibrasWidget({ token: 'SEU_TOKEN_AQUI' });
  };
  document.body.appendChild(script);
}, []);
```

Em aplicações de página única, lembre-se do ponto tratado na seção 4: como as rotas não correspondem a pastas físicas, aplique a regra de reescrita do servidor para o ícone `ilibras-LOGO.svg`.

---

## 7. Opções de configuração

```javascript
new ILibrasWidget({
  token: 'SEU_TOKEN_AQUI',
  position: 'bottom-right',
  title: 'iLibras',
  message: 'Olá! Como podemos ajudar?',
  buttonText: 'Iniciar atendimento em Libras',
  zIndex: 9999
});
```

| Opção | Tipo | Padrão | Obrigatório | Descrição |
|---|---|---|---|---|
| `token` | string | — | **Sim** | Token de autenticação fornecido pela equipe iLibras |
| `position` | string | `'bottom-right'` | Não | Posição do botão: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `title` | string | `'iLibras'` | Não | Título exibido no cabeçalho do formulário |
| `message` | string | mensagem padrão de boas-vindas | Não | Texto de boas-vindas exibido no corpo do formulário |
| `buttonText` | string | `'Iniciar atendimento em Libras'` | Não | Texto do botão de envio |
| `zIndex` | number | `9999` | Não | Camada de sobreposição (`z-index`) do widget |

> **Nota sobre `redirectUrl`:** essa opção existe por compatibilidade com versões antigas, mas no fluxo atual o redirecionamento é sempre definido pela resposta da API (`link_fila`) — o widget abre esse link automaticamente em nova aba. Não é necessário (nem recomendado) configurar `redirectUrl` em instalações novas.
>
> **Nota sobre cor:** nesta versão, as cores do widget (azul institucional iLibras) são fixas e não são configuráveis via parâmetro. Ajustes de identidade visual podem ser solicitados diretamente à equipe iLibras.

---

## 8. Campos do formulário e validações

| Campo | Obrigatório | Validação aplicada |
|---|---|---|
| Nome | Sim | Mínimo de 3 caracteres, espaços nas extremidades removidos |
| CPF | Sim | Máscara automática (`000.000.000-00`) e validação de dígitos verificadores; CPFs com sequências repetidas (ex.: `111.111.111-11`) são rejeitados |
| Telefone | Sim | Máscara automática (`(00) 00000-0000`), aceita 10 ou 11 dígitos |
| Aceite | Sim | Checkbox de consentimento para ser redirecionado ao atendimento |

Se qualquer validação falhar, o widget exibe um aviso e **não envia** os dados — nenhuma chamada é feita à API até que todos os campos estejam corretos.

---

## 9. Integração com a API — o que acontece nos bastidores

Essa seção é informativa: **nenhuma ação é necessária por parte da sua equipe**, mas é útil para diagnosticar eventuais problemas (ex.: bloqueios de firewall/CSP).

**Requisição enviada pelo widget:**

```
POST https://sistema.ilibras.com.br/api/public/widget/cadastrar
Authorization: Bearer <token do seu site>
Content-Type: multipart/form-data

nome: "João Silva"
cpf: "12345678900"
telefone: "11987654321"
```

**Resposta esperada da API:**

```json
{
  "link_fila": "https://sistema.ilibras.com.br/fila?codigo=..."
}
```

O widget abre `link_fila` em uma nova aba (`window.open`) e fecha o formulário automaticamente.

---

## 10. Aparência e personalização visual

O layout segue a identidade visual iLibras (tons de azul `#4A90E2` / `#357ABD`) e não é customizável por parâmetro nesta versão — ver nota na seção 7.

Ajustes estruturais (tamanho do botão, raio das bordas do modal, etc.) ainda podem ser feitos por CSS adicional no seu site, sobrescrevendo classes específicas do widget quando necessário:

```css
.ilibras-widget-button img {
  width: 56px !important;
  height: 56px !important;
}

.ilibras-widget-modal {
  border-radius: 20px !important;
}
```

Use esse recurso com moderação — alterações de layout não são cobertas pelo suporte padrão.

---

## 11. Compatibilidade

**Navegadores:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Opera 76+, além de navegadores mobile (iOS Safari, Chrome Mobile).

**Plataformas testadas:** HTML estático, WordPress, Joomla, Drupal, React, Vue.js, Angular, Next.js e outros frameworks JavaScript.

**Responsividade:** modal de largura adaptável em desktop, com versão otimizada em tela cheia para dispositivos móveis.

---

## 12. Segurança e privacidade dos dados

- Todos os dados são enviados via **POST** — nunca aparecem na URL do navegador.
- O CPF é validado localmente (algoritmo de dígito verificador) antes de qualquer envio à API.
- Recomenda-se que o site esteja em **HTTPS** para garantir a integridade do tráfego.
- O token é a única credencial que identifica seu site perante a API; trate-o como informação sensível (seção 3).

---

## 13. Solução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| Botão não aparece | Arquivos `.js`/`.css` não carregados ou caminho incorreto | Verifique o console (F12) e os caminhos usados no `<script>`/`<link>` |
| Ícone aparece quebrado | Caminho relativo do `ilibras-LOGO.svg` não resolve na página atual | Ver seção 4 — configure a regra de reescrita no servidor |
| Estilos não aplicados corretamente | CSS carregado depois do JS, ou conflito com CSS do site | Garanta que o `<link>` do CSS venha antes do `<script>`; use `!important` como último recurso |
| Erro "Token de autenticação não configurado" | Parâmetro `token` ausente ou vazio | Confirme que `token: 'SEU_TOKEN'` foi passado na inicialização |
| "Violates Content Security Policy" no console | O site tem uma CSP que bloqueia conexões para `sistema.ilibras.com.br` | Adicione `https://sistema.ilibras.com.br` (e, se aplicável, `wss://backend.smart2doc.com.br:6000`) ao `connect-src` da política. Peça o guia específico de CSP ao suporte se usar WordPress com plugin de segurança |
| Erro de CORS no console | A API não reconheceu o domínio de origem | Confirme com o suporte iLibras que o domínio está corretamente vinculado ao token |
| Formulário não envia após preenchido corretamente | CPF ou telefone reprovado na validação, ou falha de rede | Revise os dados de teste; verifique a aba *Network* do navegador para o código de erro retornado |

---

## 14. Checklist final antes de publicar

- [ ] Token de autenticação obtido junto à equipe iLibras
- [ ] Domínio informado corretamente no pedido do token
- [ ] Os três arquivos (`ilibras-widget.js`, `ilibras-widget.css`, `ilibras-LOGO.svg`) hospedados no site
- [ ] Código de inicialização adicionado antes de `</body>`, com o token real (não `SEU_TOKEN_AQUI`)
- [ ] Cache do navegador e de plugins de cache (se WordPress) limpo
- [ ] Botão flutuante visível no site
- [ ] Formulário abre ao clicar no botão
- [ ] Campos Nome, CPF e Telefone com validação funcionando
- [ ] Envio de teste concluído com sucesso (nova aba abre com o link de atendimento)
- [ ] Modal fecha automaticamente após o envio
- [ ] Regra de reescrita do ícone configurada, se o site tiver mais de um nível de rotas (seção 4)
- [ ] Content Security Policy ajustada, se aplicável (seção 13)

---

## 15. Suporte e contato

| Canal | Contato |
|---|---|
| Suporte técnico | suporte@ilibras.com.br |
| Comercial / novos tokens | contato@ilibras.com.br |
| Portal do Cliente | https://sistema.ilibras.com.br |
| Horário de atendimento | Segunda a sexta, 9h às 18h |

---

*Este documento reflete o comportamento da versão 1.1.0 do iLibras Widget na data de publicação (31/07/2026). Em caso de dúvida sobre qual versão está em uso, entre em contato com o suporte antes de seguir este guia.*
