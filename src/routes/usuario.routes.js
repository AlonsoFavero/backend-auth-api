const { Router } = require("express")
const { criarUsuario } = require("../controllers/usuario.controller")
const {login} = require("../controllers/auth.controller")
const {authMiddleware, adminMiddleware} = require("../middlewares/middleware")
const Usuario = require("../model/usuario.model")

const router = Router()

router.get("/perfil", authMiddleware, async (req, res) => {
    try{
    const userId = req.user.id

    const usuario = await Usuario.findById(userId)

    if(!usuario){
       return res.status(404).json({ error: "usuario não encontrado"})
    }
    return res.json({ usuario})
    } catch(error) {
        return res.status(500).json({ error: "erro interno do servidor"})
    }
})

router.delete("/usuarios/:id", authMiddleware, adminMiddleware, async(req, res) => {
     try {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndDelete(id)

        if (!usuario) {
            return res.status(404).json({ error: "usuário não encontrado" })
        }

        return res.json({ message: "usuário deletado com sucesso" })

    } catch (error) {
        return res.status(500).json({ error: "erro interno do servidor" })
    }
})

router.post("/", criarUsuario)
router.post("/login", login)

module.exports = router