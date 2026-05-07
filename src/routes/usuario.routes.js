const { Router } = require("express")
const { criarUsuario } = require("../controllers/usuario.controller")
const {login} = require("../controllers/auth.controller")


const router = Router()

router.post("/", criarUsuario)
router.post("/login", login)

module.exports = router