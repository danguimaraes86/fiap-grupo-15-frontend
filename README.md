<h1 align="center">FIAP Group 15 - Bank Account</h1>

## Sumário

- [Sumário](#sumário)
- [Descrição](#descrição)
- [Requisitos](#requisitos)
- [Funcionalidades](#funcionalidades)
- [Tecnologias e técnicas utilizadas](#tecnologias-e-técnicas-utilizadas)
- [Como clonar o repositório](#como-clonar-o-repositório)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Licença](#licença)

## Descrição
Este projeto é uma aplicação frontend desenvolvida com Next.js para gerenciamento financeiro pessoal. O design segue um design system baseado em especificações fornecidas via Figma, garantindo uma interface consistente e reutilização de componentes.

## Requisitos
- ...

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
- TypeScript
- JSON Server
- JSON DB
- Git
- Github
- Figma
- Storybook
- Design System
- Docker

Clique [aqui](https://www.figma.com/design/c1hvZBQNoN9TwePrjJqVTL/Projeto-Financeiro-do-Grupo-15?node-id=80-199&m=dev) para acessar nosso figma.

## Como clonar o repositório
```bash
$ git clone https://github.com/danguimaraes86/fiap-grupo-15-frontend.git
```

## Como rodar o projeto
Rode o ambiente de desenvolvimento:
```bash
docker-compose up --build
```
Abra a url [http://localhost:9000](http://localhost:9000) no seu navegador.

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
