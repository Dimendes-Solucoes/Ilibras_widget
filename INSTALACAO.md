# 🚀 Guia Rápido de Instalação - iLibras Widget

## Instalação em 3 Passos

### 1️⃣ Baixe os Arquivos

Copie estes 2 arquivos para o seu projeto:
- `ilibras-widget.js`
- `ilibras-widget.css`

### 2️⃣ Adicione ao seu HTML

Cole este código antes da tag `</body>`:

```html
<!-- iLibras Widget -->
<link rel="stylesheet" href="ilibras-widget.css">
<script src="ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    token: 'seu_token_aqui'  // ⚠️ Obrigatório - solicite com a equipe iLibras
  });
</script>
```

> ⚠️ **IMPORTANTE:** O parâmetro `token` é **obrigatório**. Entre em contato com a equipe iLibras para obter seu token de autenticação.

### 3️⃣ Pronto! ✅

O widget já está funcionando no canto inferior direito da sua página.

**Comportamento após envio:**
- ✅ Dados enviados para API
- 🪟 Abre link de atendimento em **nova aba**
- ❌ Modal fecha automaticamente
- 📍 Usuário permanece na página atual

---

## Personalizações Comuns

### Mudar a Posição

```javascript
new ILibrasWidget({
  token: 'seu_token_aqui',
  position: 'bottom-left'  // ou 'top-right', 'top-left'
});
```

### Mudar a Cor

```javascript
new ILibrasWidget({
  token: 'seu_token_aqui',
  primaryColor: '#0066CC'  // Qualquer cor em hexadecimal
});
```

### Personalizar Textos

```javascript
new ILibrasWidget({
  token: 'seu_token_aqui',
  title: 'Minha Empresa',
  message: 'Olá! Precisa de ajuda?',
  buttonText: 'Iniciar Conversa'
});
```

### Exemplo Completo

```javascript
new ILibrasWidget({
  token: 'abc123xyz789...',  // Token fornecido pela equipe iLibras
  position: 'bottom-right',
  primaryColor: '#FF5722',
  title: 'Suporte 24h',
  message: 'Nossa equipe está pronta para ajudar você!',
  buttonText: 'Falar com Atendente'
});
```

> 📖 **Nota:** O parâmetro `redirectUrl` foi removido. O widget agora abre automaticamente o link da API em nova aba.

### Plano de contingência (recomendado)

Se a API do iLibras não responder, o widget explica a falha dentro do próprio
modal. Configurando `fallback`, ele também oferece outro caminho de atendimento
em vez de deixar a pessoa sem saída:

```javascript
new ILibrasWidget({
  token: 'seu_token_aqui',
  fallback: {
    telefone: '(11) 4002-8922',
    email: 'acessibilidade@suaempresa.com.br'
  }
});
```

---

## Testando Localmente

1. Abra o arquivo `exemplo.html` no navegador
2. Clique no botão verde no canto da tela
3. Preencha o formulário
4. Clique em "Iniciar atendimento"

---

## Precisa de Ajuda?

📖 Leia a documentação completa no [README.md](README.md)

🐛 Encontrou um problema? Abra uma issue no GitHub

💬 Dúvidas? Entre em contato: suporte@ilibras.com.br

---

**Desenvolvido com ❤️ pela equipe iLibras**
