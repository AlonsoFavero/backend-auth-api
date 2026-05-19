const service = require("../services/usuario.service")
const { success } = require("../utils/response")
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
            const err = new Error("o admin não pode se deletar")
            err.statusCode = 400

            throw err
            }

            const usuario = await service.deletar(id)

           if(!usuario){
           const err = new Error("usuário não encontrado")
           err.statusCode = 404

           throw err
           }

            return success(res, "usuario deletado com sucesso", usuario)
    
})

const perfilUsuario = asyncHandler(async(req,res) => {
   
        const userId = req.user.id
        const usuario = await service.perfil(userId)

        if (!usuario){
        const err = new Error("perfil não encontrado")
           err.statusCode = 404

           throw err
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
    listarUsuarios
}