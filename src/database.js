const mongoose = require("mongoose")

async function conectar(){

    try{

        await mongoose.connect("mongodb+srv://AlonsoFaveroFilho:22062008@cluster0.ixmpdbb.mongodb.net/meubanco")
       console.log("conectado")
    } catch (error){
        console.log("error")
    }
}
module.exports = conectar