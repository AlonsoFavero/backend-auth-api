require("dotenv").config()
const express = require("express")
const conectar = require("./database")
const {errorHandler} = require("./middlewares/error.middleware")

const app = express()
app.use(express.json()) 

conectar()

const usuarioRoutes = require("./routes/usuario.routes")

app.use("/usuarios", usuarioRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})