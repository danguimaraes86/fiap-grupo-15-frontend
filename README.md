<div align="center">

<!-- Banner Visual -->
<img src="https://via.placeholder.com/800x200/1a1a2e/ffffff?text=FIAP+Group+15+-+Bank+Account" alt="FIAP Group 15 - Bank Account Banner" width="100%"/>

# FIAP Group 15 - Bank Account

*Sistema de gerenciamento financeiro pessoal desenvolvido com arquitetura de micro-frontends*

<!-- Badges -->
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF.svg)](https://vitejs.dev/)
[![Single-spa](https://img.shields.io/badge/Single--spa-Micro--frontends-orange.svg)](https://single-spa.js.org/)

</div>

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [📖 Descrição](#-descrição)
- [⚙️ Requisitos](#️-requisitos)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias e Técnicas Utilizadas](#️-tecnologias-e-técnicas-utilizadas)
- [📥 Como Clonar o Repositório](#-como-clonar-o-repositório)
- [🚀 Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
- [🌐 Como Acessar o Projeto Remotamente](#-como-acessar-o-projeto-remotamente)
- [🤝 Contribuindo](#-contribuindo)
- [👥 Autores e Contribuidores](#-autores-e-contribuidores)
- [❓ FAQ](#-faq)
- [🔗 Links Úteis](#-links-úteis)
- [📄 Licença](#-licença)

## 📖 Descrição

Este projeto é uma **aplicação frontend moderna** desenvolvida com **Next.js** e **React** para gerenciamento financeiro pessoal. O sistema utiliza uma **arquitetura de micro-frontends** com **Single-spa**, permitindo desenvolvimento e deploy independente de cada módulo.

### 🎨 Design System
O design segue um **design system** baseado em especificações fornecidas via **Figma**, garantindo uma interface consistente e reutilização de componentes em toda a aplicação.

### 🏗️ Arquitetura
- **Micro-frontends**: Módulos independentes (Homepage, Dashboard, Not Found)
- **Root Config**: Orquestrador principal da aplicação
- **Backend API**: Serviço REST para operações financeiras
- **Containerização**: Deploy completo via Docker

## ⚙️ Requisitos

### 📋 Requisitos Mínimos
Para rodar este projeto, você precisa ter instalado:

| Ferramenta | Versão Mínima | Versão Recomendada | Descrição |
|------------|---------------|-------------------|-----------|
| **Node.js** | 18.0.0 | 20.0.0+ | Runtime JavaScript |
| **npm** | 9.0.0 | 10.0.0+ | Gerenciador de pacotes |
| **Docker** | 20.10.0 | 24.0.0+ | Containerização |
| **Docker Compose** | 2.0.0 | 2.20.0+ | Orquestração de containers |
| **Git** | 2.30.0 | 2.40.0+ | Controle de versão |

### 🌐 Navegadores Suportados
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### 💾 Recursos de Sistema
- **RAM**: Mínimo 4GB (recomendado 8GB+)
- **Armazenamento**: 2GB livres
- **Processador**: Dual-core 2.0GHz+

## ✨ Funcionalidades

O sistema oferece uma experiência completa de gerenciamento financeiro pessoal:

### 💰 Gestão de Saldo
- **Visualização em tempo real** do saldo bancário atual
- **Histórico de alterações** com timestamps detalhados
- **Dashboard intuitivo** com gráficos e métricas

### 📊 Controle de Extratos
- **Consulta detalhada** de todos os extratos bancários
- **Filtros avançados** por data, tipo e valor
- **Exportação** de dados em diferentes formatos

### 💸 Operações Financeiras
- **Adicionar depósitos** com validação de dados
- **Realizar transações** entre contas
- **Categorização automática** de operações

### ✏️ Gerenciamento Completo
- **Editar** depósitos e transações existentes
- **Excluir** operações quando necessário
- **Auditoria completa** de todas as alterações

### 🔐 Segurança e Autenticação
- **Login seguro** com validação
- **Sessões protegidas** com tokens JWT
- **Controle de acesso** por usuário

> 💡 **Demonstração Visual**: Em breve adicionaremos capturas de tela e GIFs demonstrando cada funcionalidade em ação!

## 🛠️ Tecnologias e Técnicas Utilizadas

### 🎨 Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 18.3.1 | Biblioteca para interfaces de usuário |
| **TypeScript** | 5.8.3 | Superset tipado do JavaScript |
| **Vite** | 6.0.0 | Build tool moderna e rápida |
| **Single-spa** | 6.0.2 | Framework para micro-frontends |
| **CSS3** | - | Estilização com Media Queries |
| **Bootstrap** | - | Framework CSS com Flexbox e Grid |

### 🔧 Backend & APIs
| Tecnologia | Descrição |
|------------|-----------|
| **JSON Server** | Mock API para desenvolvimento |
| **JSON DB** | Banco de dados baseado em arquivos JSON |
| **REST API** | Comunicação via HTTP/HTTPS |
| **Axios** | Cliente HTTP para requisições |

### 🚀 DevOps & Deploy
| Tecnologia | Descrição |
|------------|-----------|
| **Docker** | Containerização da aplicação |
| **Docker Compose** | Orquestração de múltiplos containers |
| **Render** | Plataforma de deploy em nuvem |
| **Nginx** | Servidor web para servir arquivos estáticos |
| **GitHub Actions** | CI/CD (futuro) |

### 🎯 Qualidade & Desenvolvimento
| Tecnologia | Descrição |
|------------|-----------|
| **ESLint** | Linting e análise estática de código |
| **Storybook** | Documentação e testes de componentes |
| **Git** | Controle de versão distribuído |
| **GitHub** | Hospedagem do código e colaboração |
| **Figma** | Design system e prototipação |

### 📐 Padrões e Técnicas
- **Design System**: Componentes reutilizáveis e consistentes
- **Responsive Design**: Adaptável a diferentes dispositivos
- **Micro-frontends**: Arquitetura modular e escalável
- **Component-Driven Development**: Desenvolvimento baseado em componentes
- **Type Safety**: Tipagem estática com TypeScript

🎨 **Design Reference**: Acesse nosso [Figma](https://www.figma.com/design/c1hvZBQNoN9TwePrjJqVTL/Projeto-Financeiro-do-Grupo-15?node-id=80-199&m=dev) para visualizar o design system completo.

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
docker-compose up --build

# 3. Aguarde a inicialização (pode levar alguns minutos na primeira vez)
# Você verá logs de todos os serviços sendo iniciados

# 4. Acesse a aplicação
# Abra http://localhost:9000 no seu navegador
```

### 📊 Serviços Disponíveis
Após rodar o `docker-compose up`, você terá acesso a:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Aplicação Principal** | http://localhost:9000 | Interface principal (Root Config) |
| **Homepage** | http://localhost:9001 | Micro-frontend da página inicial |
| **Dashboard** | http://localhost:9002 | Micro-frontend do dashboard |
| **Not Found** | http://localhost:9003 | Micro-frontend de página não encontrada |
| **Backend API** | http://localhost:8080 | API REST do backend |

### 🔧 Método Alternativo - Desenvolvimento Local

Para desenvolvimento ativo com hot-reload:

```bash
# 1. Instale as dependências em cada micro-frontend
cd mfe-homepage && npm install && cd ..
cd mfe-dashboard && npm install && cd ..
cd mfe-notfound && npm install && cd ..
cd bytebank-root && npm install && cd ..

# 2. Configure as variáveis de ambiente (opcional)
# Crie um arquivo .env em cada pasta se necessário
echo "VITE_API_URL=http://localhost:8080" > mfe-homepage/.env

# 3. Execute cada serviço em terminais separados
# Terminal 1 - Backend
cd bytebank-backend && npm start

# Terminal 2 - Homepage
cd mfe-homepage && npm run dev

# Terminal 3 - Dashboard  
cd mfe-dashboard && npm run dev

# Terminal 4 - Not Found
cd mfe-notfound && npm run dev

# Terminal 5 - Root Config
cd bytebank-root && npm run dev
```

### 📚 Executar Storybook (Documentação de Componentes)

```bash
# Entre na pasta do micro-frontend desejado
cd mfe-homepage  # ou mfe-dashboard, mfe-notfound

# Instale dependências se ainda não instalou
npm install

# Execute o Storybook
npm run storybook

# Acesse http://localhost:6006 para ver a documentação dos componentes
```

### ⚠️ Solução de Problemas Comuns

**Problema**: Portas já em uso
```bash
# Verifique quais portas estão em uso
netstat -tulpn | grep :9000

# Pare containers existentes
docker-compose down
```

**Problema**: Erro de permissão no Docker
```bash
# No Linux, adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
# Faça logout e login novamente
```

**Problema**: Dependências desatualizadas
```bash
# Limpe o cache e reinstale
docker-compose down --volumes
docker system prune -f
docker-compose up --build
```

## 🤝 Contribuindo

Agradecemos seu interesse em contribuir com o projeto! 🎉

### 📋 Como Contribuir

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature: `git checkout -b feature/minha-feature`
4. **Faça suas alterações** seguindo nossos padrões de código
5. **Teste** suas alterações localmente
6. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
7. **Push** para sua branch: `git push origin feature/minha-feature`
8. **Abra um Pull Request** com descrição detalhada

### 🔍 Padrões de Código

- **TypeScript**: Use tipagem estrita
- **ESLint**: Execute `npm run lint` antes de commitar
- **Commits**: Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/)
- **Componentes**: Documente no Storybook quando aplicável

### 🐛 Reportando Bugs

Encontrou um bug? [Abra uma issue](https://github.com/danguimaraes86/fiap-grupo-15-frontend/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do ambiente (OS, navegador, etc.)

### 💡 Sugerindo Melhorias

Tem uma ideia? [Crie uma issue](https://github.com/danguimaraes86/fiap-grupo-15-frontend/issues) descrevendo:
- Sua proposta de melhoria
- Justificativa e benefícios
- Possível implementação

## 👥 Autores e Contribuidores

### 🎓 FIAP Group 15 - Membros Principais

Este projeto foi desenvolvido pelos estudantes do **Grupo 15** da **FIAP** como parte do curso de tecnologia:

| Avatar | Nome | GitHub | Papel |
|--------|------|--------|-------|
| 👨‍💻 | **Daniel Guimarães** | [@danguimaraes86](https://github.com/danguimaraes86) | Tech Lead & Frontend |
| 👩‍💻 | **[Nome do Membro 2]** | [@usuario2](https://github.com/usuario2) | Frontend Developer |
| 👨‍💻 | **[Nome do Membro 3]** | [@usuario3](https://github.com/usuario3) | Backend Developer |
| 👩‍💻 | **[Nome do Membro 4]** | [@usuario4](https://github.com/usuario4) | DevOps & QA |

### 🌟 Quer Fazer Parte?

Estamos sempre abertos a **novos contribuidores**! Se você:
- É estudante ou profissional de tecnologia
- Tem interesse em **React**, **TypeScript** ou **micro-frontends**
- Quer contribuir com **open source**

**Entre em contato** através das [issues](https://github.com/danguimaraes86/fiap-grupo-15-frontend/issues) ou **faça seu primeiro PR**!

## ❓ FAQ

### 🔧 Desenvolvimento

**P: Por que usar micro-frontends?**
R: Nossa arquitetura permite desenvolvimento independente de cada módulo, facilitando escalabilidade e manutenção por equipes diferentes.

**P: Como adicionar um novo micro-frontend?**
R: 1) Crie a pasta do MFE, 2) Configure o Vite + Single-spa, 3) Registre no root-config, 4) Adicione ao docker-compose.yml

**P: Posso rodar apenas um módulo?**
R: Sim! Entre na pasta do micro-frontend e execute `npm run dev`. Lembre-se de rodar o backend também.

### 🚀 Deploy

**P: Como fazer deploy de mudanças?**
R: O deploy é automático via Render quando mudanças são feitas na branch principal.

**P: Por que a aplicação demora para carregar?**
R: Usamos o plano gratuito do Render, que suspende a aplicação após períodos de inatividade.

### 🐛 Problemas Comuns

**P: Docker não encontrado/erro de permissão**
R: Instale o Docker e adicione seu usuário ao grupo docker: `sudo usermod -aG docker $USER`

**P: Porta já em uso**
R: Execute `docker-compose down` para parar containers antigos ou mude as portas no docker-compose.yml

**P: Erro de dependências**
R: Delete node_modules e package-lock.json, então execute `npm install` novamente.

## 🔗 Links Úteis

### 📚 Documentação Oficial

- **[React](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna
- **[Single-spa](https://single-spa.js.org/)** - Framework para micro-frontends
- **[Docker](https://docs.docker.com/)** - Containerização
- **[Render](https://render.com/docs)** - Plataforma de deploy

### 🎯 Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linting de código JavaScript/TypeScript
- **[Storybook](https://storybook.js.org/)** - Documentação de componentes
- **[Figma](https://www.figma.com/)** - Design e prototipação
- **[GitHub](https://docs.github.com/)** - Controle de versão e colaboração

### 📖 Recursos de Aprendizado

- **[FIAP](https://www.fiap.com.br/)** - Instituição de ensino
- **[Micro-frontends Guide](https://micro-frontends.org/)** - Guia completo sobre micro-frontends
- **[React Patterns](https://reactpatterns.com/)** - Padrões de desenvolvimento React
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Guia oficial do TypeScript

### 🛠️ Ferramentas Relacionadas

- **[VS Code](https://code.visualstudio.com/)** - Editor recomendado
- **[Postman](https://www.postman.com/)** - Teste de APIs
- **[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)** - Debugging
- **[Git](https://git-scm.com/)** - Controle de versão

## 🌐 Como Acessar o Projeto Remotamente

### 🔗 URL de Produção
Acesse a aplicação em funcionamento: **[https://bytebank-root.onrender.com/](https://bytebank-root.onrender.com/)**

### ⏰ Informações Importantes sobre o Deploy

> ⚠️ **Tempo de Inicialização**: O primeiro acesso pode levar até **50 segundos** para carregar, pois a instância é suspensa por inatividade (plano gratuito do Render).

> 💡 **Dica**: Após o primeiro carregamento, a aplicação permanece rápida durante o período de atividade.

### 🌍 Arquitetura de Deploy
- **Plataforma**: [Render](https://render.com/)
- **Tipo**: Aplicação containerizada
- **Ambiente**: Produção
- **SSL**: Habilitado automaticamente
- **CDN**: Cache automático de assets estáticos

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

**📧 Para questões comerciais ou parcerias, entre em contato através das [issues](https://github.com/danguimaraes86/fiap-grupo-15-frontend/issues)**

Para mais detalhes sobre a licença, consulte o arquivo **[LICENSE](LICENSE)**

---

### 🎓 Desenvolvido com ❤️ pelo FIAP Group 15

**Se este projeto foi útil para você, considere dar uma ⭐ no repositório!**

</div>
