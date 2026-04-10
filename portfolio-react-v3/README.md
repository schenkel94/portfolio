# Portfolio React V3

Versao nova do portfolio em React + Vite, separada do projeto principal.

## Stack

- React 18
- Vite 5
- CSS puro (tema preto, responsivo, foco em leitura profissional)

## Estrutura

- `src/App.jsx`: layout e seções principais
- `src/data/projects.js`: dados dos projetos
- `src/styles.css`: tema e responsividade
- `public/assets`: imagens reais dos projetos
- `public/obrigado.html`: retorno do formulario
- `netlify.toml`: configuracao de deploy

## Rodar local (quando Node estiver disponivel)

```bash
npm install
npm run dev
```

## Deploy no Netlify (repositorio com subpasta)

- Branch: `main`
- Base directory: `portfolio-react-v3`
- Build command: `npm run build`
- Publish directory: `dist`
