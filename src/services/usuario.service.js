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
        senha: senhaHash,
        role
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

async function atualizar(userId, nome, email, senha){
    let senhaAtualizada = senha

    if(senha){
      senhaAtualizada = await bcrypt.hash(senha, 10)
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        userId,
        {
            nome,
            email,
            senha: senhaAtualizada
        },
        {
            new: true
        }
    )
    return usuarioAtualizado
}

module.exports = {
    criar,
    deletar,
    perfil,
    atualizar
}