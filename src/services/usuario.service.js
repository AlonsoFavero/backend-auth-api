const Usuario = require("../model/usuario.model")

async function criar(nome,email,senha){
    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha
    })

    return novoUsuario
}

module.exports = {
    criar
}