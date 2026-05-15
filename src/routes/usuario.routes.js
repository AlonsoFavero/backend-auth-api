const { Router } = require("express")
const { criarUsuario, deletarUsuario, perfilUsuario, atualizarUsuario } = require("../controllers/usuario.controller")
const {login} = require("../controllers/auth.controller")
const {authMiddleware, adminMiddleware} = require("../middlewares/middleware")

const router = Router()

router.get(
    "/perfil",
    authMiddleware,
    perfilUsuario
)

router.get(
    "/usuarios",
    authMiddleware,
    adminMiddleware,
    listarUsuarios
)
    
router.delete (
    "/usuarios/:id",
    authMiddleware,
    adminMiddleware,
    deletarUsuario
)

router.put(
    "/perfil",
    authMiddleware,
    atualizarUsuario
)
    
router.post("/", criarUsuario)
router.post("/login", login)

module.exports = router