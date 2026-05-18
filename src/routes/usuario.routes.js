const { Router } = require("express")
const { criarUsuario, listarUsuarios, deletarUsuario, perfilUsuario, atualizarUsuario } = require("../controllers/usuario.controller")
const {validate} = require("../middlewares/validate.middleware")
const {login} = require("../controllers/auth.controller")
const {authMiddleware, adminMiddleware} = require("../middlewares/middleware")
const { criarUsuarioSchema, loginSchema } = require("../schemas/usuario.schema")
const { asyncHandler } = require("../middlewares/asyncHandler.middleware")

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
    
router.post("/login", validate(loginSchema), login)
router.post("/", validate(criarUsuarioSchema),asyncHandler(criarUsuario))

module.exports = router