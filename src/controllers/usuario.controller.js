const service = require("../services/usuario.service")

async function criarUsuario (req,res) {
    const {nome,email, senha} = req.body
  
    try{
     const usuario = await service.criar(nome, email, senha)
        
        return res.status(201).json({
            message: "usuario criado com sucesso",
            data: usuario
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({"error": "erro interno do servidor"})
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

module.exports = {
    criarUsuario,
    deletarUsuario
}