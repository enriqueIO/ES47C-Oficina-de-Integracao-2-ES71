# Oficina de Integração 2 - ELLP: Ensino Lúdico de Lógica e Programação

## Sistema de Cadastro e Geração de Certificados de Alunos Voluntários

Este projeto visa desenvolver um sistema para facilitar o cadastro de alunos voluntários e a emissão de certificados de participação no projeto ELLP. 

## 🤝 Membros do Projeto
- Henrique Galiano de Moraes
- Gustavo Morais Alves
- Gustavo Teodoro do Amaral
- Enrique Marques

## 📈 Fases do Projeto

### ✏️ 1. Planejamento

#### 1.1 Definição de Requisitos Funcionais
- **Autenticação**: O sistema permitirá login com usuário e senha.
- **Alteração de Senha**: O usuário poderá alterar sua senha dentro da aplicação.
- **Cadastro de Alunos**: O sistema permitirá o cadastro dos alunos voluntários do projeto.
- **Gerenciamento de Alunos**: O usuário poderá buscar, editar, excluir ou adicionar novos alunos voluntários.
- **Geração de Certificados**: O sistema permitirá a geração de um certificado de participação em PDF para qualquer aluno selecionado.

#### 1.2 Definição da Arquitetura em Alto Nível do Sistema
- **Camada de Apresentação (Frontend)**: Aplicação web construída com React e Next.js.
- **Camada de Negócios (Backend)**: API RESTful desenvolvida com Node.js e Fastify.
- **Camada de Dados (Banco de Dados)**: PostgreSQL.

#### 1.3 Definição da Estratégia de Automação de Testes
- **Front-end**: Utilização de Jest com mocks para simular chamadas ao backend e testar a interface de usuário.
- **Back-end**: Testes de integração e unitários com o uso de um banco de testes ou mocks de banco de dados, utilizando bibliotecas como Jest e Supertest.

#### 1.4 Tecnologias Utilizadas no Projeto
- **Frontend**: React.js com Next.js.
- **Backend**: Node.js com Fastify e TypeScript.
- **Banco de Dados**: PostgreSQL.

#### 1.5 Arquitetura da aplicação:
- **Usuário**: Representa a interação direta com o sistema, onde o usuário acessa o frontend.
- **Frontend**: Desenvolvido com React e Next.js, responsável pela interface de usuário e pela renderização do conteúdo dinâmico no navegador.
- **Backend**: Implementado em Node.js com Fastify, é o servidor que processa as requisições, gerencia a lógica de negócio e se comunica com o banco de dados.
- **Banco de Dados**: PostgreSQL é utilizado para armazenar dados de forma persistente, acessível pelo backend para operações de leitura e escrita.

#### Diagrama de arquitetura:
```mermaid
graph TD;
    A(Usuário) --> B(Frontend: React e Next.js);
    B --> C(Backend: Node.js e Fastfy);
    C --> B
    C --> D
    D(Banco de dados: PostgreSQL e Prisma) --> C
```

#### 1.6 Esboços da aplicação:
![Login](https://github.com/user-attachments/assets/0354f7d7-a5e9-4f58-8d80-879378958ff6)
![WhatsApp Image 2024-10-26 at 15 58 12 (1)](https://github.com/user-attachments/assets/8fe67b86-7c01-4ab3-ad1b-d218ae8491b4)
![WhatsApp Image 2024-10-26 at 15 58 12 (2)](https://github.com/user-attachments/assets/995f2a85-b67e-4aff-b061-22d5105ec1ba)
![WhatsApp Image 2024-10-26 at 15 58 13](https://github.com/user-attachments/assets/07dbb755-7ade-44c1-88d8-3af233c93c27)  

### 🚀 2. Sprints
#### Sprint 1
- Cadastro de professores (coordenadores do ELLP)
- Cadastro de alunos voluntários
- Login de professores e alunos
- Cadastro de workshops

#### Sprint 2
- Inclusão de alunos voluntários em workshops
- Geração de certificados para os alunos voluntários
- Assinatura dos certificados pelo coordenador
- Busca de certificados para os alunos voluntários
