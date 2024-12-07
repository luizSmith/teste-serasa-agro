<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de **Backend** na **Serasa**. O objetivo do projeto é demonstrar habilidades em desenvolvimento de backend, integração com PostgreSQL, testes unitários e documentação via Swagger.

## Tecnologias Utilizadas

- **Nest.js 10.4.5**: Framework para construção de APIs robustas em Node.js.
- **Node.js 20.15.1**: Ambiente de execução JavaScript no servidor.
- **Yarn 1.22.22**: Gerenciador de pacotes.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Usado para orquestrar o banco de dados PostgreSQL.
- **Swagger**: Para documentação interativa da API.
- **Vitest**: Framework de testes para realizar testes unitários.

## Requisitos

- **Node.js**: versão 20.15.1
- **Yarn**: versão 1.22.22
- **Docker**: para rodar o banco de dados PostgreSQL

## Instruções

### 1. Configuração do Banco de Dados

Certifique-se de ter o **Docker** instalado e funcionando. Para inicializar o banco de dados PostgreSQL via Docker, execute o comando:

```bash
docker compose up
````

O docker-compose irá configurar e iniciar uma instância do PostgreSQL automaticamente. A configuração do banco de dados está definida no arquivo database.sql, que contém todas as tabelas e inserções necessárias para rodar a aplicação corretamente.

### 2. Rodar Local

Primeiro garanta a existencia deu m banco de dados postgres e que as váriaveis estejam em um arquivo .env com os mesmos nomes do arquivo `process-local.env`


### Instalação das Dependências
Após garantir que o banco de dados esteja em execução, instale as dependências do projeto utilizando o Yarn:

```bash
yarn install
````


### Executando a API
Após a instalação das dependências, inicie o servidor Nest.js com o comando:

bash
Copiar código

```bash
yarn start
````

### 3. A documentação

A documentação da API foi configurada utilizando o Swagger. Para acessá-la, basta navegar até a seguinte URL no seu navegador:

```bash
http://localhost:3000/api-docs
````

### 4. Testes Unitários
Para executar os testes unitários da service, execute o seguinte comando:

```bash
yarn test
````
