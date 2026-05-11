const { Router } = require("express")
const { criarUsuario, deletarUsuario } = require("../controllers/usuario.controller")
const {login} = require("../controllers/auth.controller")
const {authMiddleware, adminMiddleware} = require("../middlewares/middleware")

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

router.delete (
    "/usuarios/:id",
    authMiddleware,
    adminMiddleware,
    deletarUsuario
)
    

router.post("/", criarUsuario)
router.post("/login", login)

module.exports = router