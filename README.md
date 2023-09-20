![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 3 - Backend

## RESTful API

### Funcionalidades

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações
- [Extra] Filtrar transações por categoria

**Importante: Cada usuário só pode ver e manipular seus próprios dados e suas próprias transações.**

## **Banco de dados**

- usuarios

| id | nome | email (campo único) | senha |
| ---| ---- | ------------------- | ----- |

- categorias

| id | descricao | 
| -- | --------- | 

- transacoes

| id | descricao | valor | data | categoria_id | usuario_id | tipo |
| ---| --------- | ----- | ---- | ------------ | ---------- | ---- |


## **Categorias**

- Alimentação
- Assinaturas e Serviços
- Casa
- Mercado
- Cuidados Pessoais
- Educação
- Família
- Lazer
- Pets
- Presentes
- Roupas
- Saúde
- Transporte
- Salário
- Vendas
- Outras receitas
- Outras despesas

**IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script de inserção das categorias acima na tabela.**

## **Requisitos obrigatórios**

- A API acessa o banco de dados a ser criado "dindin" para manipular os dados de usuários, categorias e transações utilizados pela aplicação.

- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
  - email
  - senha
---

## :lock: **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, deverão receber o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token, para poder acessar as rotas. 

### **Validações do token**

- **REQUISITOS OBRIGATÓRIOS**
  - Validar se o token foi enviado no header da requisição (Bearer Token)
  - Verificar se o token é válido
  - Consultar usuário no banco de dados pelo id contido no token informado

### **Detalhar usuário**

#### `GET` `/usuario`

Com essa rota o usuario obtém os dados do seu próprio perfil.  

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  

- **Requisição**   
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - senha

### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.  

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.  

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.  

- **Requisição**  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  

- **Requisição**  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota exibe o extrato de todas as suas transações cadastradas, ou seja, uma resposta num objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
 

### **Filtrar transações por categoria**

#### `GET` `/transacao?filtro=nomeDaCategoria`
Consultar apenas transações das categorias informadas.

## :computer: Comandos para rodar o projeto
```bash
git clone link
```
```bash
cd desafio-backend-m02-b2bt05
```
```bash
npm install
```
```bash
npm run dev
```
O servidor inciará na porta:3000 - para isso acesse:
```bash
http://localhost:3000
```


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 



## Autoras


###### tags: `back-end` `módulo 3` `nodeJS` `PostgreSQL` `API REST` `desafio`
