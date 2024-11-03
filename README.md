# Oficina de Integração 2 - ELLP: Ensino Lúdico de Lógica e Programação

## Projeto: Sistema de Cadastro e Geração de Certificados de Alunos Voluntários

Este projeto visa desenvolver um sistema para facilitar o cadastro de alunos voluntários e a emissão de certificados de participação no projeto ELLP. 

## Tema Escolhido
Cadastro e geração de certificados para os alunos voluntários envolvidos no projeto ELLP.

## Membros do Projeto
- Henrique Galiano de Moraes
- Gustavo Morais Alves
- Gustavo Teodoro do Amaral
- Enrique Marques

**Local:** Cornélio Procópio, Paraná  
**Ano:** 2024

## Fases do Projeto

### 1. Planejamento

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
