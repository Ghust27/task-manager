![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/github/license/Ghust27/task-manager) ![Issues](https://img.shields.io/github/issues/Ghust27/task-manager)

# Task Manager

Uma aplicação backend para gerenciamento de tarefas, construída com Node.js, Express e Mongoose, utilizando MongoDB como banco de dados. Implementa operações CRUD (Create, Read, Update, Delete) para tarefas com autenticação de usuários.

---

## Índice

- [Visão Geral](#visão-geral)  
- [Funcionalidades](#funcionalidades)  
- [Tecnologias](#tecnologias)  
- [Pré-requisitos](#pré-requisitos)  
- [Configuração](#configuração)  
- [Como Executar](#como-executar)  
- [Estrutura de Pastas](#estrutura-de-pastas)  
- [Endpoints da API](#endpoints-da-api)  
- [Contribuição](#contribuição)  
- [Licença](#licença)  

---

## Visão Geral

O **Task Manager** é uma API RESTful para gerenciamento de tarefas:

- **Autenticação**: Cadastro e login de usuários com JWT e senhas criptografadas.  
- **Gerenciamento de Tarefas**: Criação, leitura, atualização e exclusão de tarefas associadas a usuários autenticados.  
- **Banco de Dados**: Integração com MongoDB via Mongoose ORM.  
- **Segurança**: Validação de entrada e proteção contra ataques comuns.  

---

## Funcionalidades

- 🔐 Autenticação segura com JWT e bcrypt.  
- 📋 Operações CRUD para gerenciamento de tarefas.  
- 🛡️ Validação de dados de entrada.  
- 🗄️ Integração com MongoDB usando Mongoose.  
- 📊 Respostas JSON padronizadas para endpoints.  

---

## Tecnologias

| Camada     | Tecnologias                                          |
| ---------- | ---------------------------------------------------- |
| **Backend**| Node.js · Express · Mongoose · MongoDB · JWT · bcrypt |

---

## Pré-requisitos

- **Node.js** v14+  
- **npm** ou **yarn**  
- **MongoDB** (instalado localmente ou em um serviço como MongoDB Atlas)  

---

## Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/Ghust27/task-manager.git
   cd task-manager
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente na raiz do projeto (.env):
   ```bash
   MONGODB_URI=mongodb://localhost:27017/task_manager
   JWT_SECRET=seu_jwt_secret
   PORT=5000
   ```

---

## Como Executar

1. Inicie o servidor:
   ```bash
   npm start
   ```

2. A API estará disponível em: `http://localhost:5000/api`

---

## Estrutura de Pastas

```plaintext
├── src
│   ├── controllers    # Lógica de negócio dos endpoints
│   ├── middleware     # Middlewares (autenticação, validação, erros)
│   ├── models         # Modelos do Mongoose (User, Task)
│   ├── routes         # Definição das rotas da API
│   ├── utils          # Funções utilitárias (ex.: conexão com DB)
│   └── app.js         # Configuração do Express
├── .env               # Variáveis de ambiente
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto
```

---

## Endpoints da API

| Método | Endpoint                  | Descrição                          | Autenticação |
| ------ | ------------------------- | ---------------------------------- | ------------ |
| POST   | `/api/auth/register`      | Cadastra um novo usuário           | Não          |
| POST   | `/api/auth/login`         | Faz login e retorna JWT            | Não          |
| GET    | `/api/tasks`              | Lista todas as tarefas do usuário  | Sim          |
| POST   | `/api/tasks`              | Cria uma nova tarefa               | Sim          |
| GET    | `/api/tasks/:id`          | Obtém uma tarefa por ID            | Sim          |
| PUT    | `/api/tasks/:id`          | Atualiza uma tarefa                | Sim          |
| DELETE | `/api/tasks/:id`          | Deleta uma tarefa                  | Sim          |

---

