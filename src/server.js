require("dotenv").config()
const express = require("express")
const conectar = require("./database")

const app = express()
app.use(express.json()) 

conectar()

const usuarioRoutes = require("./routes/usuario.routes")

app.use("/usuarios", usuarioRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})