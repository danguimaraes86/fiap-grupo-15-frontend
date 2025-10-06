# ByteBank - Gerenciamento Financeiro Mobile

<div align="center">

_Aplicação mobile desenvolvida com Flutter para controle financeiro pessoal_

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

**ByteBank** é uma aplicação mobile multiplataforma desenvolvida com **Flutter** para gerenciamento financeiro pessoal. O sistema oferece uma experiência nativa para Android, iOS e Web, com integração completa ao Firebase para autenticação, banco de dados e armazenamento de arquivos.

### 🏗️ Arquitetura

- **Flutter SDK 3.24.5** com **Dart 3.5.4**
- **Firebase** como Backend-as-a-Service (Authentication, Firestore, Storage)
- **Provider Pattern** para gerenciamento de estado reativo
- **Material Design** seguindo guidelines do Google

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

### 📱 Framework
| Tecnologia | Versão  | Descrição                        |
| ---------- | ------- | -------------------------------- |
| Flutter    | 3.24.5  | Framework multiplataforma Google |
| Dart       | 3.5.4   | Linguagem de programação         |

### 🔥 Firebase
| Dependência      | Versão   | Descrição                    |
| ---------------- | -------- | ---------------------------- |
| firebase_core    | ^4.1.1   | Inicialização do Firebase    |
| firebase_auth    | ^6.1.0   | Autenticação de usuários     |
| cloud_firestore  | ^6.0.2   | Banco de dados NoSQL         |
| firebase_storage | ^13.0.2  | Armazenamento de arquivos    |

### 📦 Dependências Principais
| Dependência     | Versão    | Descrição                   |
| --------------- | --------- | --------------------------- |
| provider        | ^6.1.5+1  | Gerenciamento de estado     |
| intl            | ^0.20.2   | Formatação de datas/valores |
| file_picker     | ^8.1.6    | Seleção de arquivos         |
| url_launcher    | ^6.3.1    | Abertura de arquivos e URLs |
| http            | ^1.5.0    | Requisições HTTP            |
| cupertino_icons | ^1.0.8    | Ícones iOS                  |

### 🧪 Desenvolvimento
| Dependência   | Versão  | Descrição                     |
| ------------- | ------- | ----------------------------- |
| flutter_lints | ^5.0.0  | Regras de qualidade de código |
| flutter_test  | SDK     | Testes unitários e widgets    |

## 📥 Como Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/danguimaraes86/fiap-grupo-15-frontend.git

# Entre no diretório do projeto
cd fiap-grupo-15-frontend
```

## 🚀 Como Rodar o Projeto

### 📋 Pré-requisitos

- **Flutter SDK 3.24.5** ou superior ([Download](https://flutter.dev/docs/get-started/install))
- **Dart SDK 3.5.4** (incluído no Flutter)
- **Editor**: VS Code ou Android Studio
- **Dispositivo/Emulador**: Android, iOS ou Chrome

### ⚙️ Configuração do Firebase

1. **Crie um projeto no [Firebase Console](https://console.firebase.google.com)**

2. **Configure os serviços**
   - **Authentication**: Ative Email/Password
   - **Firestore Database**: Crie um banco de dados
   - **Storage**: Ative o Firebase Storage

3. **Baixe os arquivos de configuração**
   - **Android**: `google-services.json` → `android/app/`
   - **iOS**: `GoogleService-Info.plist` → Adicione no Xcode
   - **Web**: Configure no código

4. **Gere firebase_options.dart**

   ```bash
   flutter pub global activate flutterfire_cli
   flutterfire configure
   ```

### 🔧 Instalação e Execução

```bash
# 1. Instale as dependências
flutter pub get

# 2. Verifique dispositivos disponíveis
flutter devices

# 3. Execute a aplicação

# Web (Chrome)
flutter run -d chrome

# Android
flutter run -d android

# iOS (apenas macOS)
flutter run -d ios

# Acesso via IP (celular na mesma rede)
flutter run -d chrome --web-hostname=0.0.0.0 --web-port=8080
```

### 🔥 Hot Reload

Durante o desenvolvimento:
- **`r`** - Hot reload (recarrega alterações)
- **`R`** - Hot restart (reinicia app)
- **`q`** - Quit (encerra)

## 📁 Estrutura do Projeto

```text
lib/
├── configs/          # Configurações (rotas, Firebase, cores)
├── models/           # Modelos de dados
├── pages/            # Telas da aplicação
│   ├── dashboard/    # Dashboard com gráficos
│   ├── home/         # Autenticação
│   ├── shared/       # Componentes compartilhados
│   └── transactions/ # CRUD de transações
├── providers/        # Gerenciamento de estado
├── services/         # Serviços (Auth, Firestore, Storage)
└── utils/            # Utilitários e validators
```

## 🔗 Links Úteis

- [Flutter](https://flutter.dev/) - Framework multiplataforma
- [Dart](https://dart.dev/) - Linguagem de programação
- [Firebase](https://firebase.google.com/docs) - Backend-as-a-Service
- [Provider](https://pub.dev/packages/provider) - Gerenciamento de estado
- [Pub.dev](https://pub.dev/) - Repositório de pacotes Dart

## 📄 Licença

Este projeto está licenciado sob a **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**

### Você Pode

- **Compartilhar** — copiar e redistribuir o material
- **Adaptar** — remixar, transformar e criar a partir do material
- **Atribuição** — você deve dar crédito apropriado aos autores

### Condições

- **Não Comercial** — você não pode usar o material para fins comerciais
- **Atribuição** — você deve fornecer crédito apropriado e indicar se mudanças foram feitas

### É Proibido

- Usar para **fins comerciais** sem autorização
- Remover ou alterar os **créditos dos autores**
- Usar para **treinamento de IA comercial** sem consentimento

---

<div align="center">

### 🎓 Desenvolvido com ❤️ pelo FIAP Group 15

**Se este projeto foi útil, considere dar uma ⭐ no repositório!**

</div>
