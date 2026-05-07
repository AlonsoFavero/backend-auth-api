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

module.exports = {criarUsuario}