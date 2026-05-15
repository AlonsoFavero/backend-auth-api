const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario.model")

async function criar(nome,email,senha){
    const usuarioExiste = await Usuario.findOne({ email })

    if(usuarioExiste){
        throw new Error("email ja cadastrado")
    }
    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash
    })

    return novoUsuario
}

async function listar(){
    return Usuario.find()
}

async function deletar(id){
    const usuario = await Usuario.findByIdAndDelete(id)

    return usuario
}

async function perfil(id){
    const usuario = await Usuario.findById(id)

    return usuario
}

module.exports = {
    criar,
    deletar,
    perfil
}