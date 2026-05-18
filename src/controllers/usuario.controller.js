const {service} = require("../services/usuario.service")
const { asyncHandler } = require("../middlewares/asyncHandler.middleware")

const criarUsuario = asyncHandler(async(req,res) => {

        const usuario = await service.criar(
            req.body.nome,
            req.body.email,
            req.body.senha
        )
        return res.json({
            message: "usuario criado com sucesso",
            data: usuario
        })

})

const listarUsuarios = asyncHandler(async(req,res) => {

    const usuarios = await service.listar()

    return res.json({
        data:usuarios
    })

})

const deletarUsuario = asyncHandler(async(req,res) => {

            const { id } = req.params

            if(req.user.id===id){
                return res.status(400).json({
                    error:"o admin não pode se deletar"
                })
            }

            const usuario = await service.deletar(id)
    
            if (!usuario) {
                return res.status(404).json({ error: "usuário não encontrado" })
            }
    
            return res.json({ message: "usuário deletado com sucesso" })
    
})

const perfilUsuario = asyncHandler(async(req,res) => {
   
        const userId = req.user.id
        const usuario = await service.perfil(userId)

        if(!usuario) {
            return res.status(404).json({ error: "perfil não encontrado"})
        }
       
        return res.json({
            message: "perfil encontraddo com sucesso",
            usuario
        })

    
})

const atualizarUsuario = asyncHandler(async(req,res) => {
const {nome, email, senha} = req.body

    const userId = req.user.id
const usuario = await service.atualizar(userId, nome, email, senha)
        
        return res.status(200).json({
            message: "usuario atualizado com sucesso",
            data: usuario
})

})



module.exports = {
    criarUsuario,
    deletarUsuario,
    perfilUsuario,
    atualizarUsuario,
}