const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario.model")
const AppError = require("../utils/AppError")

async function criar(nome,email,senha){
    const usuarioExiste = await Usuario.findOne({ email })

    if(usuarioExiste){
        throw new AppError("email ja cadastrado", 409)
    }
    const senhaHash = await bcrypt.hash(senha, 10)
    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
    })

    return novoUsuario
}

async function listar(){
    return Usuario.find()
}

async function deletar(id){
    const usuario = await Usuario.findById(id)

  if(!usuario){
           throw new AppError("usuário não encontrado", 404)
           }
      await Usuario.findByIdAndDelete(id)

    return usuario
}

async function perfil(id){
    const usuario = await Usuario.findById(id)

    if(!usuario){
        throw new AppError("perfil não encontrado", 404)
    }

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
    atualizar,
    listar
}