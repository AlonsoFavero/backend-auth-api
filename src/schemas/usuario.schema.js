const {z} = require("zod")

const criarUsuarioSchema = z.object({
     nome: z.string(),

    email: z.string().email(),

    senha: z.string().min(6)
})

module.exports = {
    criarUsuarioSchema
}