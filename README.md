<h1 align="center">FIAP Group 15 - Bank Account</h1>

## Sumário

* [Descrição](#descrição)
* [Requisitos](#requisitos)
* [Funcionalidades](#funcionalidades)
* [Tecnologias utilizadas](#tecnologias-e-técnicas-utilizadas)
* [Como clonar o repositório](#como-clonar-o-repositório)
* [Como rodar o projeto](#como-rodar-o-projeto)
* [Licença](#licença)

## Descrição
Este projeto é uma aplicação frontend desenvolvida com Next.js para gerenciamento financeiro pessoal. O design segue um design system baseado em especificações fornecidas via Figma, garantindo uma interface consistente e reutilização de componentes.

## Requisitos
- Next.js para desenvolvimento do frontend com SSR e SSG
- Design System baseado em Figma para UI/UX consistente
- Funcionalidades de CRUD para transações financeiras
- Formulários para inserção e edição de dados financeiros
- Navegação entre páginas de home e respectivos modais de listagem, adição e edição
- Estilização utilizando CSS-in-JS ou outra solução compatível com Next.js
- Resposividade entre dispositivos

## Funcionalidades
O sistema permite que o usuário:
1. Visualize seu saldo bancário
2. Consulte seu extratos
3. Adicione depositos
4. Faça transações financeiras
5. Edite e exclua depositos e transações

## Tecnologias e técnicas utilizadas
- CSS
    - Media Queries
- Bootstrap
    - Flexbox
    - Grid
- Next.js
- TypeScript
- JSON Server
- JSON DB
- Git
- Github
- Figma
- Storybook
- Design System

## Como clonar o repositório
```bash
$ git clone https://github.com/JacquelinBB/isw-implementacao.git
```

## Como rodar o projeto
Primeiro baixe as dependências:
```bash
npm install i
npm run dev
```

Rode o ambiente de desenvolvimento:
```bash
npm run dev
```
Abra a url [http://localhost:3000](http://localhost:3000) no seu navegador.

Rode o JSON Server:
```bash
npx json-server --watch db.json --port 5000
```

Rode o Storybook:
```bash
npm run build-storybook
npm run storybook
```

## Licença
Este projeto está licenciado sob a [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/). 

Você pode:
- Compartilhar e modificar este trabalho para fins **não comerciais**, desde que atribua os devidos créditos aos autores.

É estritamente proibido:
- Usar este trabalho para fins comerciais sem a autorização prévia dos autores.

Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).
