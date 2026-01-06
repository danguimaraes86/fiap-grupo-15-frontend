# ByteBank - Gerenciamento Financeiro Web

<div align="center">

_Aplicação Web desenvolvida com Angular para controle financeiro pessoal_

</div>

### 🔗 Repositório

- [fiap-grupo-15-frontend](https://github.com/danguimaraes86/fiap-grupo-15-frontend/)

### 🎓 FIAP Group 15 - Membros

| Nome                 | GitHub                                                 |
| -------------------- | ------------------------------------------------------ |
| **Daniel Guimarães** | [@danguimaraes86](https://github.com/danguimaraes86)   |
| **Daniel Simão**     | [@hayadan7](https://github.com/hayadan7)               |
| **Giorgio Costa**    | [@giorgiocost](https://github.com/giorgiocost)         |
| **Jacquelin Busch**  | [@JacquelinBB](https://github.com/JacquelinBB)         |
| **Pedro Bueno**      | [@PedroBueno-tech](https://github.com/PedroBueno-tech) |

## 📖 Descrição

**ByteBank** é uma aplicação Web multiplataforma desenvolvida com **Angular** para gerenciamento financeiro pessoal. O sistema oferece uma experiência nativa para Web sendo responsivo para smarthphones, com integração completa ao Firebase para autenticação, banco de dados e armazenamento de arquivos.

### 🏗️ Arquitetura

- **Angular 21.0.0** utilizando arquitetura de **Single Page Application (SPA)** e **Standalone Components**, reduzindo acoplamento e simplificando a manutenção
- Organização baseada em **componentes reutilizáveis** e **camada de services**, promovendo separação clara de responsabilidades
- Gerenciamento de estado realizado por meio de **Services + RxJS**, com comunicação reativa entre componentes
- **Firebase** como Backend-as-a-Service:
  - **Authentication** com login e senha, utilizando **token** para controle de sessão
  - **Firestore** como banco de dados NoSQL
  - **Storage** para armazenamento de arquivos
- Implementação de **Guards de rota** para proteção de áreas autenticadas
- Camada dedicada de **services** para comunicação com o backend
- Interface construída com **Angular Material** seguindo as guidelines do Google, em conjunto com **Bootstrap**, garantindo responsividade e consistência visual

## ✨ Funcionalidades

### 💰 Gestão de Saldo

- Visualização em tempo real do saldo bancário atual
- Dashboard intuitivo com gráficos e métricas
- Cálculo automático de receitas e despesas

### 📊 Controle de Transações

- Histórico completo de todas as transações
- Filtros avançados por mês e categoria
- Paginação infinita para melhor performance
- Atualização em tempo real após edições/exclusões

### 💸 Operações Financeiras

- Criar transações com validação de dados
- Categorização inteligente (Alimentação, Transporte, Moradia, Lazer, Saúde)
- Tipos de transação (Receitas e Despesas)
- Seleção de data com calendário interativo

### 📎 Gerenciamento de Anexos

- Upload de arquivos (PDF, imagens, documentos)
- Armazenamento seguro no Firebase Storage
- Download/visualização de anexos
- Suporte multiplataforma (Web e Mobile)
- Content-type correto para cada tipo de arquivo

### ✏️ Edição e Exclusão

- Modal de edição com validação completa
- Substituição de anexos durante edição
- Exclusão segura com confirmação
- Limpeza automática de arquivos no Storage

### 🔐 Segurança e Autenticação

- Firebase Authentication com email/senha
- Cadastro de novos usuários
- Sessões persistentes e seguras
- Logout protegido

## 🛠️ Tecnologias Utilizadas

### 📱 Framework e Linguagem

| Tecnologia | Versão | Descrição                                      |
| ---------- | ------ | ---------------------------------------------- |
| Angular    | 21.0.0 | Framework front-end para SPA                   |
| TypeScript | 5.9.2  | Linguagem principal da aplicação               |
| RxJS       | 7.8.0  | Programação reativa e gerenciamento de streams |

---

### 🎨 UI / UX

| Tecnologia       | Versão | Descrição                                    |
| ---------------- | ------ | -------------------------------------------- |
| Angular Material | 21.0.0 | Biblioteca de componentes UI                 |
| Angular CDK      | 21.0.0 | Utilitários e padrões de acessibilidade      |
| Bootstrap        | 5.3.8  | Layout responsivo e estilização complementar |

---

### 📊 Visualização de Dados

| Tecnologia | Versão | Descrição                       |
| ---------- | ------ | ------------------------------- |
| Chart.js   | 4.5.1  | Criação de gráficos interativos |

---

### 🔥 Backend / Integrações

| Tecnologia | Versão | Descrição                                  |
| ---------- | ------ | ------------------------------------------ |
| Firebase   | 12.6.0 | Authentication, Firestore e Storage (BaaS) |

---

### 🧪 Desenvolvimento e Qualidade

| Tecnologia  | Versão | Descrição                             |
| ----------- | ------ | ------------------------------------- |
| Angular CLI | 21.0.0 | Ferramenta de build e desenvolvimento |
| Vitest      | 4.0.8  | Testes unitários                      |
| Prettier    | —      | Padronização e formatação de código   |

## 📥 Como Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/danguimaraes86/fiap-grupo-15-frontend.git

# Entre no diretório do projeto
cd fiap-grupo-15-frontend
```

## 🚀 Como Rodar o Projeto

### 📋 Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- **Node.js** (versão LTS recomendada)
- **NPM** (instalado junto com o Node.js)
- **Angular CLI 21.0.0** ou superior
- **Editor de código**: VS Code (recomendado)

---

### 🔥 Configuração do Firebase

1. **Crie um projeto no Firebase**

   Acesse o [Firebase Console](https://console.firebase.google.com) e crie um novo projeto.

2. **Configure os serviços necessários**

   - **Authentication**: habilite o provedor **Email/Password**
   - **Firestore Database**: crie um banco de dados
   - **Storage**: habilite o Firebase Storage para upload de arquivos

3. **Crie um app Web no Firebase**

   - No painel do Firebase, adicione um **Web App**
   - Copie as credenciais de configuração (`apiKey`, `authDomain`, etc.)

4. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com as variáveis do Firebase:

   ```env
   FIREBASE_API_KEY=xxxx
   FIREBASE_AUTH_DOMAIN=xxxx
   FIREBASE_PROJECT_ID=xxxx
   FIREBASE_STORAGE_BUCKET=xxxx
   FIREBASE_MESSAGING_SENDER_ID=xxxx
   FIREBASE_APP_ID=xxxx
   ```

### 🔧 Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

```bash
# 1. Instale as dependências
npm install

# 2. Gere os arquivos de ambiente (caso utilize .env)
npm run generate-env

# 3. Execute a aplicação
npm start
```

## 📦 Scripts Disponíveis

| Comando                | Descrição                                       |
|------------------------|-------------------------------------------------|
| `npm start`            | Inicia o servidor de desenvolvimento            |
| `npm run build`        | Gera o build de produção                        |
| `npm run watch`        | Build em modo watch                             |
| `npm test`             | Executa os testes                               |
| `npm run generate-env` | Gera os arquivos de ambiente a partir do `.env` |


## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── floating-button/
│   │   ├── graphic/
│   │   ├── login-modal/
│   │   ├── nav-bar/
│   │   ├── register-modal/
│   │   ├── side-nav/
│   │   ├── snack-bar/
│   │   ├── summary-card/
│   │   └── transaction-form/
│   ├── config/                # Configurações da aplicação
│   ├── guards/                # Route guards de autenticação
│   ├── models/                # Interfaces e modelos de dados
│   ├── pages/                 # Páginas (views)
│   │   ├── dashboard-view/
│   │   ├── home-view/
│   │   └── transaction-list/
│   │       └── components/    # Componentes específicos da página
│   │           └── delete-transaction/
│   ├── pipes/                 # Pipes customizados
│   ├── services/              # Camada de serviços e integrações
│   └── utils/                 # Funções utilitárias
├── assets/
│   └── images/                # Imagens estáticas
├── environments/              # Configurações de ambiente
└── themes/                    # Temas e estilos globais

```

## 🔗 Links Úteis

- [Angular](https://angular.dev/) - Framework front-end
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Angular Material](https://material.angular.io/) - Biblioteca de componentes UI
- [Bootstrap](https://getbootstrap.com/) - Framework de layout responsivo
- [Firebase](https://firebase.google.com/docs) - Backend-as-a-Service
- [Chart.js](https://www.chartjs.org/docs/latest/) - Biblioteca de gráficos
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [NPM](https://www.npmjs.com/) - Gerenciador de pacotes

---

## 📄 Licença

Este projeto está licenciado sob a **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**

### Você Pode

- **Compartilhar** — copiar e redistribuir o material
- **Adaptar** — remixar, transformar e criar a partir do material
- **Atribuição** — você deve dar crédito apropriado aos autores

### Condições

- **Uso não comercial** — o material não pode ser utilizado para fins comerciais
- **Atribuição** — você deve fornecer crédito apropriado e indicar se mudanças foram feitas

### É Proibido

- Utilizar o projeto para **fins comerciais** sem autorização
- Remover ou alterar os **créditos dos autores**
- Usar o projeto para **treinamento de IA comercial** sem consentimento

---

<div align="center">

### 🎓 Desenvolvido com ❤️ pelo FIAP Group 15

**Se este projeto foi útil, considere dar uma ⭐ no repositório!**

</div>
