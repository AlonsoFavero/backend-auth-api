const service = require("../services/usuario.service")

async function criarUsuario (req,res, next) {
    const {nome,email, senha} = req.body

    if(!nome ||
        !email ||
        !senha
    ){
        return res.status(400).json({error: "todos os campos são obrigatorios"})
    }

     if(senha.length < 6 ){
        return res.status(400).json({"error": "a senha deve ter no mínimo 6 caracteres"})
    }

    if(!email.includes("@")){
        return res.status(400).json({"error": "email não contém @"})
    }
  
    try{
     const usuario = await service.criar(nome, email, senha)
        
        return res.status(201).json({
            message: "usuario criado com sucesso",
            data: usuario
        })
    }
    catch(error){
        if(error.message === "email ja cadastrado"){
        return res.status(400).json({"error": "email ja esta sendo utilizado"})
        }
          return next(error)
    }
}

async function listarUsuarios(req,res){
try{
    const usuarios = await service.listar()

    return res.status(200).json({
        message: "lista criada com sucesso",
        data: usuarios
    })
} catch(error){
    return res.status(500).json({"error": "erro interno no servidor"})
}
}

async function deletarUsuario(req,res){

    try {
            const { id } = req.params
    
            if (req.user.id === id){
               return res.status(400).json({
                error: "o admin não pode se deletar"
               })
            }

            const usuario = await service.deletar(id)
    
            if (!usuario) {
                return res.status(404).json({ error: "usuário não encontrado" })
            }
    
            return res.json({ message: "usuário deletado com sucesso" })
    
        } catch (error) {
            return res.status(500).json({ error: "erro interno do servidor" })
        }
}

async function perfilUsuario(req,res){
    try{
        const userId = req.user.id
        const usuario = await service.perfil(userId)

        if(!usuario) {
            return res.status(404).json({ error: "perfil não encontrado"})
        }
       
        return res.json({
            message: "perfil encontraddo com sucesso",
            usuario
        })

    } catch (error){
        return res.status(500).json({ error: "erro interno no servidor"})
    }
}

async function atualizarUsuario(req,res){
const {nome, email, senha} = req.body

try{
    const userId = req.user.id
const usuario = await service.atualizar(userId, nome, email, senha)
        
        return res.status(200).json({
            message: "usuario atualizado com sucesso",
            data: usuario
})
}catch(error){
    return res.status(500).json({"error": "erro interno do servidor"})
}
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
    criarUsuario,
    deletarUsuario,
    perfilUsuario,
    atualizarUsuario,
    atualizar
}