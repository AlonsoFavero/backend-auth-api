const service = require("../services/usuario.service")
const { success, error } = require("../utils/response")
const { asyncHandler } = require("../middlewares/asyncHandler.middleware")

const criarUsuario = asyncHandler(async(req,res) => {

        const usuario = await service.criar(
            req.body.nome,
            req.body.email,
            req.body.senha
        )
        return success(res, "usuario criado com sucesso", usuario)

})

const listarUsuarios = asyncHandler(async(req,res) => {

    const usuarios = await service.listar()

   return success(res, "lista de usuários", usuarios)

})

const deletarUsuario = asyncHandler(async(req,res) => {

            const { id } = req.params

            if (req.user.id === id){
            return error(res,"o admin não pode se deletar", 400)
            }

            const usuario = await service.deletar(id)

           if(!usuario){
           return error(res,"usuário não encontrado", 404)
           }

            return success(res, "usuario deletado com sucesso", usuario)
    
})

const perfilUsuario = asyncHandler(async(req,res) => {
   
        const userId = req.user.id
        const usuario = await service.perfil(userId)

        if (!usuario){
        return error(res,"perfil não encontrado", 404)
        }
       
        return success(res, "usuario encontrado com sucesso", usuario)
    
})

const atualizarUsuario = asyncHandler(async(req,res) => {

const {nome, email, senha} = req.body
 const userId = req.user.id
 
const usuario = await service.atualizar(userId, nome, email, senha)
        
        return success(res, "usuario atualizado com sucesso", usuario)

})

module.exports = {
    criarUsuario,
    deletarUsuario,
    perfilUsuario,
    atualizarUsuario,
}