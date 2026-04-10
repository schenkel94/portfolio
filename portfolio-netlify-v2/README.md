# Portfolio Netlify V2

Nova versão do portfólio criada em uma pasta isolada para não alterar o projeto principal.

## Estrutura

- `index.html`: landing page principal
- `styles.css`: identidade visual e responsividade
- `script.js`: filtros, drawer dos cases, animações e navegação
- `obrigado.html`: tela de sucesso do formulário
- `assets/`: imagens reutilizadas do projeto original
- `netlify.toml`: configuração de deploy para quando esta pasta for usada como raiz do site

## Como publicar no Netlify

### Opção 1: deploy rápido

1. No Netlify, crie um novo site via drag and drop.
2. Envie o conteúdo da pasta `portfolio-netlify-v2`.

### Opção 2: conectando este repositório

1. Crie um novo site a partir do Git.
2. Configure `Base directory` como `portfolio-netlify-v2`.
3. Configure `Publish directory` como `.`.
4. Não é necessário `Build command`.

## Formulário

O formulário já está preparado para `Netlify Forms`, então o envio de mensagens funciona nativamente após o deploy.
