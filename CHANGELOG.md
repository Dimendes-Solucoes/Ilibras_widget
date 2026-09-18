# 📝 Changelog - iLibras Widget

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [1.5.2] - 2026-09-18

### 🗂️ Uma aba, não duas

Ao criar o atendimento, o widget abria a aba nova **e** trocava a página da aba
atual. A pessoa terminava com duas.

A causa estava no plano B para pop-up bloqueado:

```js
const aba = window.open(destino, '_blank', 'noopener');
if (!aba) window.location.assign(destino);
```

A especificação manda `window.open` devolver `null` sempre que `noopener` está
presente — **mesmo quando a aba abre**. O teste lia esse `null` como pop-up
bloqueado, e a segunda linha disparava sempre.

Agora a chamada vai sem a feature e a proteção é feita na mão
(`aba.opener = null`), o que dá o mesmo isolamento e preserva o retorno — que é
justamente o que distingue aba aberta de aba barrada. O plano B continua de pé
para quando o pop-up é realmente bloqueado: melhor trocar de página do que
sumir com um atendimento já criado.

---

## [1.5.1] - 2026-09-18

### 🎨 O tema do site não pinta mais o widget

Todas as regras de estilo passaram a ser escopadas por
`#ilibras-widget-container`.

O widget usava seletores de uma classe só — `.ilibras-widget-submit` tem
especificidade (0,1,0) e perde para qualquer tema que estilize botões com dois
níveis. Um `.elementor-kit-275 button` é (0,1,1) e vencia.

O estrago aparecia num site real: botões verdes, cantos arredondados em 30px e
o "X" de fechar virado pílula — dentro de um widget cuja promessa é justamente
se bastar no site dos outros. O botão principal escapava por acidente, porque o
gradiente dele pintava por cima da cor do tema; o de agendar, sem gradiente,
ficava verde.

Com o prefixo, as regras vão a (1,1,0): ganham de qualquer seletor de tema
**sem recorrer a `!important`**, e continuam perdendo para o `!important` que o
README ensina o cliente a usar quando quer customizar de propósito. Quem
customiza sem `!important` precisa passar a usá-lo.

Problema antigo, anterior à v1.5.0 — só ficou visível quando o segundo botão
entrou no formulário.

---

## [1.5.0] - 2026-09-18

### 🙋 O formulário pede só o nome

CPF e telefone saíram. Para chamar um intérprete não é preciso identificar a
pessoa, e cada campo a mais era uma barreira a quem só queria ser atendido — em
especial um CPF digitado errado, que reprovava o envio inteiro.

Sai junto o que existia só para eles: a validação de CPF, a lista de DDDs, as
máscaras dos dois campos. O widget ficou 4,5 KB menor.

O que continua: nome (com sobrenome), a caixa de consentimento, a armadilha
anti-robô e a marca de tempo de abertura.

### 📲 Aviso por SMS mora no iLibras, não aqui

Quem agenda um horário e quer ser avisado por SMS informa o celular **na tela
de agendamento do iLibras**, e o número vale só para aquele atendimento. Era o
motivo que restava para o widget pedir telefone de todo mundo — inclusive de
quem nem ia agendar.

### 🔁 Compatibilidade

A API continua aceitando `cpf` e `telefone`, então **widget antigo instalado em
site de cliente segue funcionando** sem ser atualizado.

Esta é uma versão **minor** de propósito, e não major: quem seguiu o README e
fixou `@1` recebe a mudança automaticamente, que é o ponto. A API pública do
pacote (configuração e métodos) não mudou em nada.

**Requer o iLibras com CPF e telefone opcionais.** Contra uma versão anterior do
servidor, o cadastro sem CPF seria recusado com erro de validação.

---

## [1.4.0] - 2026-09-16

### 📦 O widget virou pacote npm

```bash
npm i ilibras-widget
```

```js
import ILibrasWidget from 'ilibras-widget';
new ILibrasWidget({ token: 'SEU_TOKEN' });
```

Três formatos saem da mesma fonte (`src/`): ESM para bundler, CJS para
`require`, e a build de `<script>` — que continua publicada no mesmo endereço
de sempre, `ilibras-widget.js` na raiz. Nenhum site instalado precisa mudar
nada.

Publicar no npm também dá uma CDN de graça:

```html
<script src="https://cdn.jsdelivr.net/npm/ilibras-widget@1/dist/ilibras-widget.js"></script>
```

### 🖼️ Estilo e logo agora vão dentro do JavaScript

Era um `<link>` para um CSS irmão e um `<img>` para um SVG irmão, ambos
resolvidos procurando a própria `<script src>` na página. Sob um bundler essa
tag não existe: o caminho caía na URL do site do cliente, dava 404, e o widget
aparecia cru — sem nada no console que explicasse por quê.

**Isso corrige um problema que já existia.** As instruções de instalação nunca
mencionaram `ilibras-LOGO.svg` — mandavam baixar só o JS e o CSS. Quem seguiu o
README ao pé da letra estava com a logo do botão quebrada desde sempre.

O `<style>` é acrescentado ao fim do `<head>`, na mesma posição de cascata do
`<link>` de antes: quem sobrescreve o visual pelo CSS do próprio site segue
sobrescrevendo igual.

### 🔤 Tipos TypeScript inclusos

Sem instalar `@types`. Cobrem a configuração inteira, os métodos públicos e os
tipos de falha.

### 🧪 Testes

`npm test` guarda o que mais provavelmente quebra num pacote embarcável: o
widget chegar ao site do cliente sem estilo ou sem logo, o import criar widget
sozinho, ou a build de `<script>` perder o global que o WordPress usa.

### 🔁 Compatibilidade

Nada quebra. O `ilibras-widget.js` da raiz tem o mesmo endereço, o mesmo global
e o mesmo comportamento — só que agora se basta. O `ilibras-widget.css` continua
no repositório para quem ainda o referencia, mas não é mais necessário.

---

## [1.3.0] - 2026-09-16

### ✨ Agendamento direto pelo widget

- Novo botão no formulário: **Agendar uma conversa**. Quem clica não entra na
  espera ao vivo — cai direto no calendário do iLibras, escolhe dia e horário e
  recebe confirmação e lembretes por e-mail.

  O cadastro é o mesmo dos dois lados; o que muda é o campo `modo` enviado
  (`fila` ou `agendamento`) e, por consequência, o link que o iLibras devolve.

- Quem entra por este botão não passa pela fila ao vivo em momento nenhum: o
  iLibras já cria o atendimento fora dela. Se a pessoa desistir e voltar para a
  fila pela própria página, entra no fim — e a página avisa isso antes.

  O aviso de saída da fila só existe para quem já estava esperando e clica em
  agendar lá. Pelo widget não há aviso: a escolha foi feita antes de existir
  fila para perder.

- Duas opções novas: `agendamento` (liga e desliga o botão, padrão `true`) e
  `scheduleButtonText` (o texto dele).

  Desligue com `agendamento: false` no site que só atende ao vivo: um botão que
  leva a uma agenda que ninguém cobre é pior do que não ter o botão.

### 🔁 Compatibilidade

Nenhuma quebra. Widget já instalado que não for atualizado continua enviando o
cadastro sem `modo`, e o iLibras trata a ausência como `fila` — exatamente o
comportamento anterior.

**Requer o iLibras com suporte a `modo` no endpoint do widget.** Sem ele o
campo é ignorado e o botão de agendar leva à fila, como antes.

---

## [1.2.0] - 2026-09-11

Adequações de segurança e acessibilidade. Nenhuma quebra de contrato com a API:
integrações existentes continuam funcionando sem alteração.

### ♿ Acessibilidade

- O gatilho flutuante virou `<button>`. Era um `<div>`, ou seja, inalcançável
  por teclado — quem não usa mouse não conseguia abrir o widget.
- O modal virou diálogo de verdade: `role="dialog"`, `aria-modal`, rótulo pelo
  título, foco levado ao primeiro campo ao abrir, `Tab` preso dentro da janela,
  `Esc` para fechar e foco devolvido a quem abriu.
- Erros deixaram de usar `alert()`. Agora aparecem junto do campo que os
  causou, com `aria-invalid`, `aria-describedby` e ícone além da cor, e o foco
  vai para o primeiro campo inválido.
- Estado do envio anunciado por região `aria-live`; falhas de serviço por
  `role="alert"`.
- Contraste do placeholder e dos textos de apoio ajustado para 4.5:1 (AA).
- Suporte a `prefers-reduced-motion` e a `forced-colors` (alto contraste).
- `lang="pt-BR"` no container, para o leitor de tela usar a voz certa em site
  de outro idioma.

### 🛡️ Indisponibilidade do serviço

- Toda requisição tem prazo (`timeoutMs`, 15s por padrão) e é abortada ao
  estourá-lo. Antes, uma API que aceitava a conexão e não respondia deixava a
  pessoa no "Aguarde..." indefinidamente.
- Falha de rede e erro 5xx ganham uma retentativa com espera; `422` e `429`
  não são repetidos.
- Mensagens distintas por causa: sem internet, servidor fora, demora, limite de
  uso, token inválido, dados inválidos.
- Nova opção `fallback`: canais alternativos (telefone, e-mail, link) mostrados
  quando o serviço não responde.
- Erros de validação vindos da API voltam para os campos certos.

### ✅ Validação

- Nome: 3 a 120 caracteres, só letras e sinais de nome, exige sobrenome.
- Telefone: DDD conferido contra a lista nacional, 9º dígito de celular e
  prefixo de fixo validados.
- CPF: inalterado (algoritmo dos dígitos verificadores).

### 🤖 Proteção contra automação

- Campo-armadilha invisível (`site_url`) e marca de tempo de abertura
  (`iniciado_em`) enviados junto com o cadastro, para o servidor separar quem
  digitou de quem disparou um POST.
- Trava contra envio duplo enquanto uma requisição está em andamento.

### 🐛 Correções

- A logo e a folha de estilo passam a ser resolvidas a partir do endereço do
  próprio script. Eram caminhos relativos à página do cliente, então só
  carregavam quando o widget ficava na raiz do site.
- Textos de configuração (`title`, `message`, `buttonText`) passam a ser
  escapados antes de ir para o HTML.
- Se o bloqueador de pop-up impedir a nova aba, a navegação acontece na aba
  atual em vez de o atendimento se perder.

---

## [1.1.0] - 2026-02-18

### 🚀 Mudanças Importantes

#### Formato de Envio de Dados
- **BREAKING CHANGE:** Alterado de `JSON` para `FormData`
- Os dados agora são enviados como `multipart/form-data` em vez de `application/json`
- Compatível com APIs PHP que usam `$_POST`

**Antes:**
```javascript
Content-Type: application/json
body: JSON.stringify({nome, cpf, telefone, token})
```

**Agora:**
```javascript
Content-Type: multipart/form-data
body: FormData com campos: nome, cpf, telefone, token
```

#### Formato de Resposta da API
- **NOVO:** Suporte ao campo `link_fila` (prioridade máxima)
- Mantém compatibilidade com `link`, `url`, `redirect`

**Resposta Esperada:**
```json
{
  "status": "OK",
  "link_fila": "https://sistema.ilibras.com.br/acesso.php?token=...",
  "codigo": "...",
  "id_atendimento": "717",
  "id_surdo": 417
}
```

#### Comportamento de Redirecionamento
- **MUDANÇA:** Redirecionamento agora abre em **nova aba**
- Usa `window.open(url, '_blank')` em vez de `window.location.href`
- Modal do widget fecha automaticamente após envio bem-sucedido
- Usuário permanece na página original

### 🐛 Correções

#### Content Security Policy (CSP)
- Adicionada solução para CSP via Nginx
- Documentação atualizada com configuração de servidor
- Suporte a múltiplos ambientes (Apache + Nginx)

**Configuração Nginx:**
```nginx
add_header Content-Security-Policy "connect-src 'self' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br;";
```

#### Estilos do Botão Close
- Corrigido problema de cor do botão de fechar em sites com CSS global
- Adicionado `!important` para forçar cor branca
- Adicionado `pointer-events: none` em SVGs

### 📚 Documentação

- ✅ Atualizado README.md com novo formato de requisição/resposta
- ✅ Atualizado WORDPRESS.md com soluções de CSP específicas
- ✅ Documentado comportamento de nova aba
- ✅ Adicionados exemplos práticos de integração

---

## [1.0.0] - 2025-XX-XX

### ✨ Lançamento Inicial

#### Funcionalidades
- Widget flutuante similar ao WhatsApp
- Formulário com validação de CPF e Telefone
- Máscaras de entrada automáticas
- Tema azul (#4A90E2)
- Posicionamento configurável (4 posições)
- Envio via POST para API
- Validação de token obrigatório
- Suporte a WordPress
- Responsivo e acessível

#### Campos do Formulário
- Nome completo
- CPF (com validação de dígitos verificadores)
- Telefone (10-11 dígitos)
- Checkbox de consentimento

#### Configurações
- `position`: Posição do widget na tela
- `primaryColor`: Cor principal do tema
- `title`: Título do modal
- `message`: Mensagem de boas-vindas
- `buttonText`: Texto do botão de envio
- `token`: Token de autenticação (obrigatório)
- `zIndex`: Controle de sobreposição

---

## 🔮 Próximas Atualizações (Roadmap)

### Em Desenvolvimento
- [ ] Modo escuro automático
- [ ] Suporte a múltiplos idiomas
- [ ] Analytics integrado
- [ ] Callbacks personalizados
- [ ] Temas pré-definidos

### Considerando
- [ ] Suporte a anexos
- [ ] Chat em tempo real
- [ ] Histórico de conversas
- [ ] Notificações push

---

## 📋 Notas de Migração

### Migração de 1.0.0 para 1.1.0

Se você já usa o widget versão 1.0.0, siga estas etapas:

1. **Atualizar arquivos:**
   - Baixe `ilibras-widget.js` e `ilibras-widget.css` mais recentes
   - Substitua os arquivos antigos

2. **Verificar API:**
   - Certifique-se que sua API aceita `FormData` (multipart/form-data)
   - Campos disponíveis: `$_POST['nome']`, `$_POST['cpf']`, `$_POST['telefone']`, `$_POST['token']`

3. **Atualizar resposta da API (opcional):**
   - Adicione campo `link_fila` na resposta JSON
   - Mantenha `link`, `url` ou `redirect` para compatibilidade

4. **Configurar CSP (se necessário):**
   - Se tiver erro de CSP, adicione `https://sistema.ilibras.com.br` nos domínios permitidos
   - Veja [WORDPRESS.md](WORDPRESS.md) para soluções específicas

5. **Testar:**
   - Limpe cache do navegador
   - Teste envio de formulário
   - Verifique se abre em nova aba
   - Confirme que modal fecha após envio

---

## 🤝 Contribuindo

Encontrou um bug? Tem uma sugestão? 

1. Abra uma issue descrevendo o problema/sugestão
2. Se possível, envie um PR com a correção
3. Documente qualquer mudança no comportamento

---

## 📞 Suporte

Para dúvidas sobre:
- **Integração**: Consulte [README.md](README.md)
- **WordPress**: Consulte [WORDPRESS.md](WORDPRESS.md)
- **Token**: Consulte [TOKEN.md](TOKEN.md)
- **CSP**: Entre em contato com suporte técnico

---

**Legenda:**
- ✨ Nova funcionalidade
- 🐛 Correção de bug
- 🚀 Melhoria de performance
- 📚 Documentação
- ⚠️ Breaking change
- 🔒 Segurança
