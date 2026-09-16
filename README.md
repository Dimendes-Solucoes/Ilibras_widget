# 🎯 iLibras Widget - Widget de Atendimento Embarcável

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS-3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)

Widget embarcável similar ao WhatsApp para captura de dados (Nome e CPF) com integração via API. Envia dados de forma segura via POST e redireciona para plataforma de atendimento. Ideal para integração em sites, sistemas e plataformas web.

![iLibras Widget](https://via.placeholder.com/800x400/25D366/FFFFFF?text=iLibras+Widget)

## ✨ Características

- 🚀 **Fácil integração** - Apenas 2 linhas de código
- 🎨 **Totalmente personalizável** - Cores, posição, textos e mais
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile
- ✅ **Validação automática** - CPF validado antes do envio
- 🔒 **Envio seguro** - Dados enviados via POST para API
- 🎭 **Máscaras de entrada** - Formatação automática de CPF
- 🌐 **Universal** - Funciona em qualquer site ou sistema
- ♿ **Acessível** - Suporte a leitores de tela e navegação por teclado
- 🌙 **Tema escuro** - Adapta-se automaticamente às preferências do usuário

## 📦 Instalação

O widget é um arquivo só: estilo e logo vão embutidos. Não há CSS nem imagem
para baixar junto, e não há caminho para configurar errado.

> ⚠️ Em qualquer uma das opções, troque `SEU_TOKEN_AQUI` pelo token que a
> equipe iLibras forneceu para o contrato.

### Opção 1: npm

Para projetos com bundler — React, Vue, Svelte, Next, Nuxt, Astro, Vite,
webpack:

```bash
npm i ilibras-widget
```

```js
import ILibrasWidget from 'ilibras-widget';

const widget = new ILibrasWidget({ token: 'SEU_TOKEN_AQUI' });
```

Importar não cria widget nenhum — quem decide quando instanciar é você. Isso é
o que permite usar o pacote em projeto com renderização no servidor, onde o
import acontece onde não existe `document`.

O pacote traz tipos TypeScript; não é preciso instalar `@types`.

#### React

```jsx
import { useEffect } from 'react';
import ILibrasWidget from 'ilibras-widget';

export function Acessibilidade() {
  useEffect(() => {
    const widget = new ILibrasWidget({ token: 'SEU_TOKEN_AQUI' });
    // Sem isto, cada montagem deixa um widget para trás e o site acumula
    // botões flutuantes.
    return () => widget.destroy();
  }, []);

  return null;
}
```

#### Vue

```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import ILibrasWidget from 'ilibras-widget';

let widget;
onMounted(() => { widget = new ILibrasWidget({ token: 'SEU_TOKEN_AQUI' }); });
onBeforeUnmount(() => widget?.destroy());
</script>
```

### Opção 2: Via CDN

Sem build, sem instalar nada. A versão fica presa na URL — atualizar é trocar
o número:

```html
<script src="https://cdn.jsdelivr.net/npm/ilibras-widget@1/dist/ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    token: 'SEU_TOKEN_AQUI'
  });
</script>
```

Use `@1` para receber correções automaticamente, ou fixe a versão exata
(`@1.4.0`) se preferir controlar cada atualização.

### Opção 3: Arquivo baixado

Para WordPress, HTML solto e qualquer site sem build. Baixe
[`ilibras-widget.js`](ilibras-widget.js) e hospede junto do seu site:

```html
<script src="ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    token: 'SEU_TOKEN_AQUI'
  });
</script>
```

> Instalações antigas incluíam também um `<link rel="stylesheet">` para
> `ilibras-widget.css`. A partir da v1.4.0 o estilo vai dentro do JavaScript e
> essa linha virou desnecessária — mas deixá-la não quebra nada.

### Instalação sem escrever JavaScript

Em qualquer uma das opções com `<script>`, dá para configurar o widget antes
de carregá-lo, e ele se cria sozinho:

```html
<script>
  window.iLibrasWidgetConfig = { token: 'SEU_TOKEN_AQUI' };
</script>
<script src="https://cdn.jsdelivr.net/npm/ilibras-widget@1/dist/ilibras-widget.js"></script>
```

## 🚀 Uso Rápido

### Configuração Básica

```javascript
new ILibrasWidget({
  token: 'SEU_TOKEN_AQUI'
});
```

> ⚠️ O parâmetro `token` é **obrigatório**. Entre em contato com a equipe iLibras para obter seu token.

### Configuração Personalizada

```javascript
new ILibrasWidget({
  position: 'bottom-right',
  redirectUrl: 'https://teste.com.br',
  primaryColor: '#4A90E2',
  title: 'iLibras',
  message: 'Olá! Como podemos ajudar?',
  buttonText: 'Iniciar atendimento',
  agendamento: true,
  scheduleButtonText: 'Agendar uma conversa',
  token: 'SEU_TOKEN_AQUI',
  zIndex: 9999
});
```

## ⚙️ Opções de Configuração

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `position` | `string` | `'bottom-right'` | Posição do widget: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `redirectUrl` | `string` | `'https://teste.com.br'` | URL para redirecionamento após envio |
| `primaryColor` | `string` | `'#4A90E2'` | Cor principal do widget (hex) |
| `title` | `string` | `'iLibras'` | Título exibido no cabeçalho |
| `message` | `string` | `'Olá, somos a equipe...'` | Mensagem de boas-vindas |
| `buttonText` | `string` | `'Iniciar atendimento em Libras'` | Texto do botão de envio |
| `agendamento` | `boolean` | `true` | Mostra o segundo botão, que leva direto à escolha de data e horário em vez da fila ao vivo. Deixe `false` em site que só atende ao vivo |
| `scheduleButtonText` | `string` | `'Agendar uma conversa'` | Texto do botão de agendamento |
| `token` | `string` | `''` | **OBRIGATÓRIO** — token de autenticação da API |
| `zIndex` | `number` | `9999` | Z-index do widget |
| `apiUrl` | `string` | endpoint de produção | Endpoint de cadastro. Troque apenas para apontar a um ambiente de homologação |
| `timeoutMs` | `number` | `15000` | Prazo de cada tentativa. Passado isso a requisição é abortada e a pessoa recebe uma mensagem, em vez de ficar no "Enviando..." |
| `tentativas` | `number` | `2` | Quantas vezes tentar quando a falha é de rede ou do servidor. Erro de validação e limite de uso nunca são repetidos |
| `fallback` | `object` | `{}` | Canais alternativos exibidos quando o serviço não responde: `{ telefone, email, url, texto }` |

### Plano de contingência (`fallback`)

Se a API do iLibras não responder, o widget mostra a falha dentro do próprio
modal e — se você tiver configurado — oferece outro caminho de atendimento, em
vez de deixar a pessoa sem saída:

```javascript
new ILibrasWidget({
  token: 'seu_token_aqui',
  fallback: {
    telefone: '(11) 4002-8922',
    email: 'acessibilidade@suaempresa.com.br',
    url: 'https://suaempresa.com.br/atendimento',
    texto: 'Enquanto isso, você pode falar com a gente por aqui:'
  }
});
```

Qualquer combinação dos quatro campos funciona; o bloco só aparece se pelo
menos um canal estiver preenchido.

## 📊 Integração com API

Quando o usuário submete o formulário, os dados são enviados via **POST** (método seguro) para a API configurada:

### Endpoint da API

```
POST https://sistema.ilibras.com.br/administrativo/api/clientes/cadastrar.php
Content-Type: multipart/form-data
```

### Dados Enviados

Os dados são enviados como **FormData** (similar a um formulário HTML tradicional):

```
nome: "João Silva"
cpf: "12345678900"
telefone: "11987654321"
token: "seu_token_de_autenticacao"
```

| Campo | Descrição | Formato |
|-------|-----------|------|
| `nome` | Nome completo do usuário | String |
| `cpf` | CPF sem formatação (apenas números) | String numérica (11 dígitos) |
| `telefone` | Telefone sem formatação (apenas números) | String numérica (10-11 dígitos) |
| `token` | Token de autenticação fornecido pela equipe | String |

### Resposta Esperada da API

A API deve retornar um JSON com um link de redirecionamento:

```json
{
  "status": "OK",
  "link_fila": "https://sistema.ilibras.com.br/acesso.php?token=eyJp...",
  "codigo": "4c6779a0aadb331ff53047879447809812fc9d5778254525d66466339135da5b",
  "id_atendimento": "717",
  "id_surdo": 417
}
```

Campos aceitos para redirecionamento (em ordem de prioridade):
- `link_fila` ⭐ **Recomendado**
- `link`
- `url`
- `redirect`

**Comportamento após envio:**
1. ✅ O widget valida e envia os dados
2. ✅ A API processa e retorna o link de atendimento
3. ✅ O link abre em **nova aba** do navegador
4. ✅ O modal do widget fecha automaticamente
5. ✅ Usuário permanece na página original enquanto o atendimento abre em outra aba

## 🎯 Exemplos de Uso

### Exemplo 1: Widget Simples

```html
<!DOCTYPE html>
<html>
<head>
  <title>Meu Site</title>
</head>
<body>
  <h1>Bem-vindo!</h1>
  
  <!-- Widget -->
  <link rel="stylesheet" href="ilibras-widget.css">
  <script src="ilibras-widget.js"></script>
  <script>
    new ILibrasWidget();
  </script>
</body>
</html>
```

### Exemplo 2: Posição Personalizada

```javascript
// Widget no canto inferior esquerdo
new ILibrasWidget({
  position: 'bottom-left'
});
```

### Exemplo 3: Customização Completa

```javascript
new ILibrasWidget({
  position: 'bottom-right',
  redirectUrl: 'https://minhaplataforma.com.br/atendimento',
  primaryColor: '#0066CC',
  title: 'Suporte Premium',
  message: 'Nossa equipe está pronta para atender você! Preencha os dados abaixo.',
  buttonText: 'Solicitar Atendimento',
  zIndex: 10000
});
```

### Exemplo 4: Auto-inicialização Global

```html
<!-- Defina a configuração antes de carregar o script -->
<script>
  window.iLibrasWidgetConfig = {
    position: 'bottom-right',
    redirectUrl: 'https://teste.com.br',
    primaryColor: '#FF5722'
  };
</script>
<script src="ilibras-widget.js"></script>
<!-- Widget será inicializado automaticamente -->
```

### Exemplo 5: Controle Programático

```javascript
// Guarde a instância
const widget = new ILibrasWidget();

// Abrir widget programaticamente
widget.openWidget();

// Fechar widget
widget.closeWidget();

// Alternar (abrir/fechar)
widget.toggleWidget();

// Remover widget da página
widget.destroy();
```

## 🎨 Personalização Avançada

### Alterar Estilos via CSS

Você pode sobrescrever os estilos padrão:

```css
/* Customizar botão flutuante */
.ilibras-widget-button {
  width: 70px !important;
  height: 70px !important;
}

/* Customizar modal */
.ilibras-widget-modal {
  border-radius: 20px !important;
}

/* Customizar inputs */
.ilibras-widget-form-group input {
  border-radius: 12px !important;
}
```

## 🔧 API JavaScript

### Métodos Públicos

```javascript
const widget = new ILibrasWidget(config);

// Abrir o widget
widget.openWidget();

// Fechar o widget
widget.closeWidget();

// Alternar estado (abrir/fechar)
widget.toggleWidget();

// Destruir o widget e remover do DOM
widget.destroy();
```

### Propriedades

```javascript
// Verificar se o widget está aberto
console.log(widget.isOpen); // true ou false

// Acessar configuração
console.log(widget.config);
```

## 🌐 Compatibilidade

### Navegadores Suportados

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

### Frameworks e CMS

O widget funciona com:

- ✅ HTML estático
- ✅ WordPress
- ✅ Joomla
- ✅ Drupal
- ✅ React
- ✅ Vue.js
- ✅ Angular
- ✅ Next.js
- ✅ Qualquer framework JavaScript

## 📱 Responsividade

O widget se adapta automaticamente a diferentes tamanhos de tela:

- Desktop: Modal de 380px de largura
- Tablet: Modal responsivo com margens
- Mobile: Modal em tela cheia com otimizações

## 🔒 Segurança e Validação

### Envio Seguro via POST

Todos os dados são enviados via **método POST** (não via URL/GET), garantindo:
- Dados não ficam expostos na URL
- Maior segurança no tráfego de informações sensíveis
- Conformidade com boas práticas de desenvolvimento web

### Validação de CPF

O widget valida o CPF antes do envio usando o algoritmo de verificação de dígitos. CPFs inválidos são rejeitados automaticamente.

```javascript
// CPFs aceitos: números válidos com 11 dígitos
// CPFs rejeitados: 
// - Números com menos de 11 dígitos
// - Sequências repetidas (111.111.111-11)
// - Dígitos verificadores incorretos
```

### Validação de Nome

- Entre 3 e 120 caracteres
- Apenas letras, espaços, apóstrofos, hífens e pontos — dígito, emoji e
  pontuação de código são rejeitados
- Exige nome e sobrenome

### Validação de Telefone

- DDD conferido contra a lista de códigos em uso no país
- Celular com 9 dígitos precisa começar em 9; fixo com 8 dígitos, entre 2 e 5
- Sequências repetidas (00000000000) são rejeitadas

### Sanitização de Dados

- CPF e telefone: apenas dígitos
- Nome: espaços das pontas removidos e sequências de espaço reduzidas a um

> **A validação do widget é conveniência, não barreira.** Ela roda no navegador
> e qualquer pessoa a desliga pelo console. As mesmas regras valem no servidor,
> e é lá que elas decidem — o widget as repete só para avisar cedo e em
> português, sem uma ida à rede.

## 🤖 Proteção contra automação

O widget participa de duas checagens simples do lado do servidor:

- **campo-armadilha** (`site_url`): existe no formulário, fica fora da tela e
  fora da leitura de tela. Só chega preenchido quando quem respondeu foi um
  programa que preenche todo campo que encontra;
- **tempo de preenchimento** (`iniciado_em`): o instante em que o modal foi
  aberto. Envio em menos de 3 segundos é recusado.

Nenhuma das duas é intransponível, e não é o que se espera delas: quem segura
volume é o limite de requisições por IP e por contrato, aplicado no servidor.
Elas existem para que o ataque trivial — um `curl` em laço — não chegue até lá.

**Não há CAPTCHA, e isso é deliberado:** o público deste widget é surdo, e
desafio visual ou de áudio é exatamente a barreira que o produto existe para
remover.

Se o limite for atingido, a API responde `429` e o widget mostra a mensagem do
servidor (que já diz quanto esperar) sem repetir a requisição.

## ♿ Acessibilidade

O widget segue as WCAG 2.1 nível AA nos pontos que dependem dele:

- **teclado**: o gatilho é um `<button>` de verdade; o modal é um
  `role="dialog"` com `aria-modal`, foco levado ao primeiro campo ao abrir,
  `Tab` preso dentro da janela, `Esc` para fechar e foco devolvido a quem
  abriu;
- **leitor de tela**: todo campo tem rótulo associado, `aria-required` e
  `aria-describedby` ligando dica e mensagem de erro; o estado do envio é
  anunciado por uma região `aria-live`; falhas de serviço usam `role="alert"`;
- **erros**: aparecem junto do campo que os causou, com ícone além da cor, e o
  foco vai para o primeiro campo inválido — nada de `alert()`;
- **contraste**: textos e mensagens em AA (4.5:1); campo inválido sinalizado por
  borda mais espessa e símbolo, não só por cor;
- **preferências do sistema**: `prefers-reduced-motion` desliga as animações e
  `forced-colors` (alto contraste do Windows) mantém contornos visíveis;
- **idioma**: o container declara `lang="pt-BR"`, para o leitor de tela usar a
  voz certa mesmo num site em outro idioma.

## 🎓 Exemplos Práticos

### WordPress

```php
<?php
// Adicione ao footer.php ou use wp_footer hook
function adicionar_ilibras_widget() {
    ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/ilibras-widget.css">
    <script src="<?php echo get_template_directory_uri(); ?>/ilibras-widget.js"></script>
    <script>
      new ILibrasWidget({
        redirectUrl: 'https://meusite.com.br/atendimento'
      });
    </script>
    <?php
}
add_action('wp_footer', 'adicionar_ilibras_widget');
?>
```

### React

```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Carregar CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/ilibras-widget.css';
    document.head.appendChild(link);

    // Carregar JS
    const script = document.createElement('script');
    script.src = '/ilibras-widget.js';
    script.onload = () => {
      new window.ILibrasWidget({
        position: 'bottom-right'
      });
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (window.iLibrasWidgetInstance) {
        window.iLibrasWidgetInstance.destroy();
      }
    };
  }, []);

  return <div className="App">Meu App</div>;
}
```

### Vue.js

```vue
<template>
  <div id="app">
    <h1>Meu App Vue</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Carregar widget
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/ilibras-widget.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = '/ilibras-widget.js';
    script.onload = () => {
      new window.ILibrasWidget({
        position: 'bottom-right',
        redirectUrl: 'https://teste.com.br'
      });
    };
    document.body.appendChild(script);
  },
  beforeUnmount() {
    if (window.iLibrasWidgetInstance) {
      window.iLibrasWidgetInstance.destroy();
    }
  }
}
</script>
```

## 📄 Estrutura de Arquivos

```
Ilibras_widget/
├── src/                     # A fonte — é aqui que se mexe
│   ├── ILibrasWidget.js     #   a classe
│   ├── index.js             #   entrada do pacote npm
│   ├── navegador.js         #   entrada da build de <script>
│   └── assets-gerados.js    #   GERADO: css e logo embutidos
├── scripts/
│   ├── gerar-assets.mjs     # css + svg  ->  src/assets-gerados.js
│   └── build.mjs            # src/  ->  dist/ e raiz
├── tests/                   # npm test
├── ilibras-widget.css       # Estilo (fonte do embutido)
├── ilibras-LOGO.svg         # Logo (fonte do embutido)
├── ilibras-widget.js        # GERADO: build de <script>, no endereço de sempre
├── index.d.ts               # Tipos TypeScript
├── exemplo.html             # Página de exemplo e demonstração
└── README.md                # Esta documentação
```

## 🛠️ Desenvolvimento

```bash
npm install     # só o esbuild
npm run build   # gera dist/ e o ilibras-widget.js da raiz
npm test        # garante que estilo e logo saíram embutidos nas três builds
```

> ⚠️ **Não edite `ilibras-widget.js` na raiz nem `src/assets-gerados.js`.** Os
> dois são gerados e sobrescritos pelo build. A lógica vive em
> `src/ILibrasWidget.js`; o visual, em `ilibras-widget.css`.

O `ilibras-widget.js` da raiz é versionado de propósito, mesmo sendo gerado:
sites já instalados apontam para esse caminho e o README manda baixá-lo de lá.
Mudar o endereço quebraria justamente quem não usa npm.

### Publicando no npm

`prepublishOnly` roda o build sozinho, então basta:

```bash
npm version minor    # ou patch / major
npm publish
```

Confira o conteúdo antes com `npm pack --dry-run`.

## 🐛 Solução de Problemas

### Widget não aparece

1. Confira se o script carregou (aba Network do navegador)
2. Veja o console: sem `token`, o widget avisa ao tentar enviar
3. Usando bundler? Lembre que `import` não cria o widget — é preciso
   `new ILibrasWidget({ token })`

### Estilos não aplicados

A partir da v1.4.0 o estilo vai dentro do JavaScript; não há mais CSS para
carregar na ordem certa. Se o visual está estranho, é conflito com o CSS do
site — usar `!important` nas suas regras resolve.

### Aparecem dois widgets

Em React, Vue ou Angular, chame `destroy()` na desmontagem do componente. Sem
isso cada montagem deixa um widget para trás.

### Erro de importação em Next.js ou Nuxt

O pacote não toca o DOM ao ser importado, então o import em si é seguro. Mas
`new ILibrasWidget(...)` precisa do navegador: crie dentro de `useEffect`
(React) ou `onMounted` (Vue), nunca no corpo do componente.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**iLibras Team**

## 📧 Suporte

Para suporte, envie um email para suporte@ilibras.com.br ou abra uma issue no GitHub.

## 🔄 Changelog

### v1.0.0 - 2026-02-18
- ✨ Versão inicial
- 🎨 Widget flutuante com design responsivo
- ✅ Validação de CPF
- 📱 Suporte mobile
- 🎯 Máscara de entrada para CPF
- 🌐 Múltiplas opções de posicionamento
- 🎨 Personalização de cores e textos
- 🔒 Envio seguro via POST para API
- 📡 Integração com API iLibras (cadastrar_cliente.php)
- 🔄 Redirecionamento automático baseado na resposta da API


Feito com ❤️ pela equipe iLibras