async function login(email,senha){
    const usuario =
    await Usuario.findOne({email})
     .select("+senha")
       
         if(!usuario){
                throw new AppError("email ou senha inválidos", 401)
            }
        
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        
            if(!senhaCorreta){
                throw new AppError("email ou senha inválidos", 401)
            }

           const usuarioSemSenha = usuario.toObject()

    delete usuarioSemSenha.senha

    return usuarioSemSenha
        
}