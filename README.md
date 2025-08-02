<div align="center">

# FIAP Group 15 - Bank Account

_Sistema de gerenciamento financeiro pessoal desenvolvido com arquitetura de micro-frontends_

</div>

### 🎓 FIAP Group 15 - Membros Principais

Este projeto foi desenvolvido pelos estudantes do **Grupo 15** da **FIAP** como parte do curso de tecnologia:

| Nome                 | GitHub                                                 |
| -------------------- | ------------------------------------------------------ |
| **Daniel Guimarães** | [@danguimaraes86](https://github.com/danguimaraes86)   |
| **Daniel Simão**     | [@hayadan7](https://github.com/hayadan7)               |
| **Giorgio Costa**    | [@giorgiocost](https://github.com/giorgiocost)         |
| **Jacquelin Busch**  | [@JacquelinBB](https://github.com/JacquelinBB)         |
| **Pedro Bueno**      | [@PedroBueno-tech](https://github.com/PedroBueno-tech) |

## 📖 Descrição

Este projeto é uma **aplicação frontend moderna** desenvolvida com **React** e **Vite** para gerenciamento financeiro pessoal. O sistema utiliza uma **arquitetura de micro-frontends** com **Single-spa**, permitindo desenvolvimento e deploy independente de cada módulo.

### 🎨 Design System

O design segue um **design system** baseado em especificações fornecidas via [**Figma**](https://www.figma.com/design/c1hvZBQNoN9TwePrjJqVTL/Projeto-Financeiro-do-Grupo-15?node-id=80-199&p=f), garantindo uma interface consistente e reutilização de componentes em toda a aplicação.

### 🏗️ Arquitetura

- **Micro-frontends**: Módulos independentes (Homepage, Dashboard, Not Found)
- **Root Config**: Orquestrador principal da aplicação
- **Backend API**: Serviço REST para operações financeiras
- **Containerização**: Deploy completo via Docker

## ✨ Funcionalidades

O sistema oferece uma experiência completa de gerenciamento financeiro pessoal:

### 💰 Gestão de Saldo

- **Visualização em tempo real** do saldo bancário atual
- **Dashboard intuitivo** com gráficos e métricas

### 📊 Controle de Extratos

- **Consulta detalhada** de todos os extratos bancários
- **Filtros avançados** por data, tipo e valor

### 💸 Operações Financeiras

- **Adicionar depósitos** com validação de dados
- **Realizar transações** entre contas
- **Categorização automática** de operações

### ✏️ Gerenciamento Completo

- **Editar** depósitos e transações existentes
- **Excluir** operações quando necessário

### 🔐 Segurança e Autenticação

- **Login seguro** com validação
- **Sessões protegidas** com tokens JWT

## 🛠️ Tecnologias e Técnicas Utilizadas

### 🎨 Frontend

| Tecnologia     | Versão | Descrição                             |
| -------------- | ------ | ------------------------------------- |
| **React**      | 18.3.1 | Biblioteca para interfaces de usuário |
| **TypeScript** | 5.8.3  | Superset tipado do JavaScript         |
| **Vite**       | 6.0.0  | Build tool moderna e rápida           |
| **Single-spa** | 6.0.2  | Framework para micro-frontends        |
| **Bootstrap**  | 5.3.7  | Framework CSS com Flexbox e Grid      |
| **Axios**      | 1.10.0 | Cliente HTTP para requisições         |

### 🔧 Backend & APIs

| Tecnologia      | Descrição                             |
| --------------- | ------------------------------------- |
| **Java 21**     | Linguagem para backend                |
| **Spring Boot** | Framework para desenvolvimento da API |
| **PostgreSql**  | Banco de Dados do Backend             |

### 🚀 DevOps & Deploy

| Tecnologia         | Descrição                                   |
| ------------------ | ------------------------------------------- |
| **Docker**         | Containerização da aplicação                |
| **Docker Compose** | Orquestração de múltiplos containers        |
| **Render**         | Plataforma de deploy em nuvem               |
| **Nginx**          | Servidor web para servir arquivos estáticos |
| **Heroku**         | Hospedagem e deploy do Backend              |

### 🎯 Qualidade & Desenvolvimento

| Tecnologia | Descrição                            |
| ---------- | ------------------------------------ |
| **ESLint** | Linting e análise estática de código |
| **Git**    | Controle de versão distribuído       |
| **GitHub** | Hospedagem do código e colaboração   |
| **Figma**  | Design system e prototipação         |

### 📐 Padrões e Técnicas

- **Design System**: Componentes reutilizáveis e consistentes
- **Responsive Design**: Adaptável a diferentes dispositivos
- **Micro-frontends**: Arquitetura modular e escalável
- **Component-Driven Development**: Desenvolvimento baseado em componentes
- **Type Safety**: Tipagem estática com TypeScript

🎨 **Design Reference**: Acesse nosso [**Figma**](https://www.figma.com/design/c1hvZBQNoN9TwePrjJqVTL/Projeto-Financeiro-do-Grupo-15?node-id=80-199&p=f) para visualizar o design system completo.

## 📥 Como Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/danguimaraes86/fiap-grupo-15-frontend.git

# Entre no diretório do projeto
cd fiap-grupo-15-frontend

# Verifique se o clone foi bem-sucedido
ls -la
```

## 🚀 Como Rodar o Projeto Localmente

### 🐳 Método Recomendado - Docker (Mais Simples)

Este é o método mais simples e garante que tudo funcione independente do seu ambiente:

```bash
# 1. Certifique-se de que o Docker está rodando
docker --version
docker-compose --version

# 2. Construa e execute todos os serviços
# Na pasta root do projeto
docker-compose up --build

# 3. Aguarde a inicialização (pode levar alguns minutos na primeira vez)
# Você verá logs de todos os serviços sendo iniciados

# 4. Acesse a aplicação
# Abra http://localhost:9000 no seu navegador
```

**PS: Os serviços backend são acessados pela API na url https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com**

### 🔧 Método Alternativo - Desenvolvimento Local

Para desenvolvimento ativo com hot-reload:

```bash
# 1. Instale as dependências em cada micro-frontend
cd mfe-homepage && npm install && cd ..
cd mfe-dashboard && npm install && cd ..
cd mfe-notfound && npm install && cd ..
cd bytebank-root && npm install && cd ..

# 2. Configure as variáveis de ambiente para homepage e dashboard
# Crie um arquivo .env em cada pasta se necessário
echo "VITE_API_URL=https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com" > mfe-homepage/.env
echo "VITE_API_URL=https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com" > mfe-dashboard/.env

# 3. Execute cada serviço em terminais separados
# Terminal 1 - Root Config
cd bytebank-root && npm start

# Terminal 2 - Homepage
cd mfe-homepage && npm run dev

# Terminal 3 - Dashboard
cd mfe-dashboard && npm run dev

# Terminal 4 - Not Found
cd mfe-notfound && npm run dev
```

## 🔗 Links Úteis

### 📚 Documentação Oficial

- **[React](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna
- **[Single-spa](https://single-spa.js.org/)** - Framework para micro-frontends
- **[Docker](https://docs.docker.com/)** - Containerização
- **[Render](https://render.com/docs)** - Plataforma de deploy

## 🌐 Como Acessar o Projeto Remotamente

### 🔗 URL de Produção

Acesse a aplicação em funcionamento:
- **[https://bytebank-root.onrender.com/](https://bytebank-root.onrender.com/)**

**PS: Pode haver um delay de 50 segundos no primeiro carregamento, pois a instância é encerrada por inatividade.**

## 📄 Licença

Este projeto está licenciado sob a **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**

### ✅ Você Pode:

- **Compartilhar** — copiar e redistribuir o material em qualquer suporte ou formato
- **Adaptar** — remixar, transformar e criar a partir do material
- **Atribuição** — você deve dar crédito apropriado aos autores originais

### ❌ Sob as Seguintes Condições:

- **Não Comercial** — você não pode usar o material para fins comerciais
- **Atribuição** — você deve fornecer crédito apropriado, providenciar um link para a licença e indicar se mudanças foram feitas

### 🚫 É Estritamente Proibido:

- Usar este trabalho para **fins comerciais** sem autorização prévia dos autores
- Remover ou alterar os **créditos dos autores originais**
- Usar para **treinamento de IA comercial** sem consentimento

---

<div align="center">

### 🎓 Desenvolvido com ❤️ pelo FIAP Group 15

**Se este projeto foi útil para você, considere dar uma ⭐ no repositório!**

</div>
