const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario.model")

async function criar(nome,email,senha){
    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash
    })

    return novoUsuario
}

async function deletar(id){
    const usuario = await Usuario.findByIdAndDelete(id)

    return usuario
}

module.exports = {
    criar,
    deletar
}