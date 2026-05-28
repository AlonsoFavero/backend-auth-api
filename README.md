# 🔐 Backend Auth API

API RESTful desenvolvida com Node.js, Express e MongoDB com foco em autenticação, autorização e controle de acesso baseado em roles utilizando JWT.

O projeto implementa boas práticas de organização em camadas, tratamento centralizado de erros, validação de dados e proteção de rotas.

---

# Sumário

* Tecnologias
* Arquitetura
* Funcionalidades
* Fluxo de autenticação
* Estrutura do projeto
* Rotas
* Middlewares
* Variáveis de ambiente
* Instalação
* Testes
* Melhorias futuras
* Autor

---

# Tecnologias Utilizadas

| Tecnologia | Função                |
| ---------- | --------------------- |
| Node.js    | Ambiente de execução  |
| Express    | Framework HTTP        |
| MongoDB    | Banco de dados NoSQL  |
| Mongoose   | ODM do MongoDB        |
| JWT        | Autenticação          |
| bcrypt     | Hash de senhas        |
| Joi        | Validação de dados    |
| dotenv     | Variáveis de ambiente |

---

# Arquitetura do Projeto

O projeto segue separação em camadas para melhorar:

* organização
* escalabilidade
* manutenção
* reutilização de código

## Camadas

### Controllers

Responsáveis por receber as requisições e retornar respostas.

### Services

Contêm as regras de negócio da aplicação.

### Middlewares

Responsáveis por autenticação, autorização, validação e tratamento de erros.

### Models

Representação das entidades do banco de dados utilizando Mongoose.

### Schemas

Validação de dados de entrada.

---

# Estrutura de Pastas

```bash
src/
 ├── controllers/
 │    ├── auth.controller.js
 │    └── usuario.controller.js
 │
 ├── middlewares/
 │    ├── asyncHandler.middleware.js
 |    |_  error.middleware.js
 │    ├── middleware.js
 │    └── validate.middleware.js
 │
 ├── model/
 │    └── usuario.model.js
 │
 ├── routes/
 │    └── usuario.routes.js
 │
 ├── schemas/
 │    └── usuario.schema.js
 │
 ├── services/
 │    ├── auth.service.js
 │    └── usuario.service.js
 │
 ├── utils/
 │    ├── AppError.js
 │    └── response.js
 │
 |_ database.js
 └── server.js
```

---

# Fluxo de Autenticação

## Cadastro

O usuário é criado com senha criptografada utilizando bcrypt.

---

## Login

Após autenticação:

* email é validado
* senha é comparada com bcrypt
* JWT é gerado

Exemplo de payload:

```json
{
  "id": "user_id",
  "role": "admin"
}
```

---

## Token JWT

O token deve ser enviado nas rotas protegidas:

```http
Authorization: Bearer SEU_TOKEN
```

---

# Controle de Acesso

A aplicação possui autorização baseada em roles.

## Roles disponíveis

```txt
user
admin
```

---

## Permissões

| Funcionalidade    | User | Admin |
| ----------------- | ---- | ----- |
| Visualizar perfil | ✅    | ✅     |
| Atualizar perfil  | ✅    | ✅     |
| Listar usuários   | ❌    | ✅     |
| Deletar usuários  | ❌    | ✅     |

---

# Middlewares

## authMiddleware

Responsável por:

* verificar token JWT
* validar autenticação
* adicionar usuário autenticado no req.user

---

## adminMiddleware

Responsável por:

* permitir acesso apenas para usuários admin

---

## ownerOrAdminMiddleware

Responsável por:

* permitir acesso ao próprio usuário
* permitir acesso total ao admin

---

# Rotas

## Criar usuário

```http
POST /usuarios
```

### Body

```json
{
  "nome": "Alonso",
  "email": "alonso@test.com",
  "senha": "123456",
  "role": "admin"
}
```

---

## Login

```http
POST /usuarios/login
```

### Body

```json
{
  "email": "alonso@test.com",
  "senha": "123456"
}
```

---

## Perfil autenticado

```http
GET /usuarios/perfil
```

---

## Atualizar perfil

```http
PUT /usuarios/perfil
```

---

## Listar usuários

```http
GET /usuarios/usuarios
```

### Permissão

```txt
Admin
```

---

## Deletar usuário

```http
DELETE /usuarios/usuarios/:id
```

### Permissão

```txt
Admin
```

---

# Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=seuSegredoSuperSeguro
```

---

# Instalação e Execução

## Clonar repositório

```bash
git clone https://github.com/AlonsoFavero/backend-auth-api.git
```

---

## Instalar dependências

```bash
npm install
```

---

## Executar projeto

```bash
node src/server.js
```

ou

```bash
npm run dev
```

---

# Testes Realizados

Os testes da aplicação foram realizados utilizando Postman.

## Fluxos testados

* Cadastro de usuários
* Login
* Geração de token JWT
* Rotas protegidas
* Controle de acesso por role
* Atualização de perfil
* Exclusão de usuários
* Bloqueio de acesso sem autenticação
* Bloqueio de acesso sem permissão

---

# Melhorias Futuras

* Refresh Token
* Upload de imagem de perfil
* Recuperação de senha
* Logs estruturados
* Testes automatizados
* Deploy em nuvem
* Rate limiting
* Documentação Swagger

---

# Conceitos Aplicados

Durante o desenvolvimento foram aplicados conceitos importantes de backend:

* APIs REST
* Arquitetura em camadas
* Middlewares
* JWT
* Hash de senhas
* Controle de acesso
* Tratamento de erros
* Validação de dados
* MongoDB com Mongoose
* Segurança em APIs

---

# 👨‍💻 Autor

Desenvolvido por: Alonso Favero Filho.
