const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario.model")

async function login (req, res){
    const {email , senha} = req.body
    const usuario = await Usuario.findOne({email})
    .select("+senha")

    if(!usuario){
        return res.status(400).json({error: "usuario não encontrado"})
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCorreta){
        return res.status(400).json({error: "senha invalida"})
    }

    const token = jwt.sign(
        { id: usuario._id},
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )

    return res.json({ token})
}

module.exports = {login}