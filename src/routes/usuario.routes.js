const {Router} = require("express")

const{
    criarUsuario
} = require("../controllers/usuario.controller")

const router = Router()

router.post("/", criarUsuario)

module.exports = router