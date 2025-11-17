# Trabalho Prático: Conexão via ORM (Prisma/TypeScript)

Este repositório contém a demonstração da abordagem de conexão abstraída usando o ORM (Object-Relational Mapper) **Prisma** em um ambiente Node.js e TypeScript.

## 🎯 Objetivo deste Projeto

O objetivo deste código é demonstrar como um ORM moderno como o Prisma abstrai a complexidade do banco de dados, permitindo uma experiência de desenvolvimento "Type-Safe" (segura de tipos).

O foco é mostrar como:
* As consultas SQL são substituídas por chamadas de métodos e objetos (ex: `prisma.usuario.findMany()`).
* O gerenciamento da conexão é totalmente automático (através do `PrismaClient`).
* Os resultados são retornados como objetos TypeScript tipados, e não apenas arrays.
* O gerenciamento do banco (criação de tabelas) é feito inteiramente com base em um arquivo de schema (`schema.prisma`), usando **Migrations**.

## 🗂️ O "Jeito Prisma": Schema-First e Migrations

Diferente de uma abordagem nativa (com scripts `.sql` manuais), este projeto usa as ferramentas do próprio Prisma para gerenciar o banco de dados:

1.  **Schema (A "Fonte da Verdade"):** O arquivo `prisma/schema.prisma` descreve a *estrutura* das tabelas (`usuarios`, `tarefas`) e seus relacionamentos em uma linguagem simples.
2.  **Migrations (As "CREATE TABLE"):** Ao invés de escrever SQL, executamos um comando (`migrate dev`) que lê o *schema* e gera/executa automaticamente o SQL necessário (neste caso, para SQLite) para criar ou atualizar o banco.

Isso torna a estrutura do banco de dados parte do controle de versão do projeto.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Ambiente:** Node.js
* **ORM:** Prisma
* **SGBD:** SQLite
* **Gerenciamento de DB:** Prisma Migrate
* **Demonstração:** `ts-node` (Script) e `prisma studio` (Web GUI)

---

## 🚀 Instruções de Instalação e Execução

Para rodar este projeto do zero e ver a mágica acontecer:

### 1. Instalação do Projeto

1.  Clone este repositório.
2.  Navegue até a pasta do projeto: `cd Prisma`
3.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```

### 2. Configuração do Banco de Dados (Automático)

1.  Crie o arquivo `.env` na raiz do projeto (este arquivo é ignorado pelo Git).
2.  Adicione a seguinte linha a ele. O Prisma usará isso para criar o arquivo do banco:
    ```env
    DATABASE_URL="file:./dev.db"
    ```
3.  (Opcional) Verifique se o `tsconfig.json` está configurado para o `ts-node` (conforme fizemos em nossos testes):
    ```json
    {
      "compilerOptions": {
        "module": "CommonJS",
        "esModuleInterop": true,
        "types": ["node"]
        // ... outras opções
      }
    }
    ```

### 3. Execução da "Mágica" (Migrate)

Este é o comando que cria o banco de dados E as tabelas, tudo de forma automática.

1.  Execute no terminal:
    ```bash
    npx prisma migrate dev
    ```
    * Isso irá ler o `prisma/schema.prisma`, gerar o SQL e criar o arquivo `prisma/dev.db` com as tabelas `usuarios` e `tarefas`.
    * Ele também gera o `PrismaClient` em `node_modules` para uso no seu código.

**Seu banco de dados agora está 100% pronto!**

---

## 🔬 Demonstração do CRUD (Duas Formas)

Para demonstrar o CRUD, temos duas abordagens: um script de terminal e uma interface gráfica.

### 1. Demonstração via Script (ts-node)

O arquivo `src/script.ts` contém exemplos de todas as operações do CRUD.

1.  Para executar o script completo (que cria, lê, atualiza e deleta dados):
    ```bash
    npx ts-node src/script.ts
    ```
2.  Os comandos do Prisma (o "código" deste projeto) se parecem com isto:

    * **READ (Relação 1:N - A Mágica do JOIN):**
        ```typescript
        > const u = await prisma.usuario.findUnique({
        >   where: { id: 1 },
        >   include: { tarefas: true } // "inclui" as tarefas
        > });
        ```
        *(Substitui: `SELECT ... FROM usuarios LEFT JOIN tarefas ...`)*

    * **READ (Relação N:1 - A Mágica da Sub-query):**
        ```typescript
        > const t = await prisma.tarefa.findUnique({
        >   where: { id: 1 },
        >   include: { usuario: true } // "inclui" o usuário
        > });
        ```
        *(Substitui: `SELECT ... FROM tarefas LEFT JOIN usuarios ...`)*

    * **CREATE:**
        ```typescript
        > await prisma.usuario.create({
        >   data: { nome: 'Novo Usuário', email: 'novo@email.com' }
        > });
        ```
        *(Substitui: `INSERT INTO ...`)*

    * **UPDATE:**
        ```typescript
        > await prisma.tarefa.update({
        >   where: { id: 1 },
        >   data: { descricao: "Nova descrição" }
        > });
        ```
        *(Substitui: `UPDATE ... SET ... WHERE ...`)*

    * **DELETE:**
        ```typescript
        > await prisma.usuario.delete({ where: { id: 1 } });
        ```
        *(Substitui: `DELETE FROM ...`)*

### 2. Demonstração via Web GUI (Prisma Studio)

O Prisma oferece uma interface de "CRUD automático" para desenvolvimento.

1.  Inicie o Prisma Studio:
    ```bash
    npx prisma studio
    ```
2.  Isso abrirá `http://localhost:5555` no seu navegador.
3.  Você terá uma interface completa para clicar, criar, editar e deletar dados visualmente em suas tabelas `Usuario` e `Tarefa`.

## 🧑‍💻 Autores

* Aluno 1: William Lidoni
* Aluno 2: Giovane da Silva Gobeti
