import mongoose from "mongoose"

const httpcentrosFormacion =new mongoose.Schema({
    codigo :{ type :String, require :true} ,
    nombre : {type:String, require :true},
    direccion : {type:String ,require :true},
    createdAt: { type: Date, default: Date.now },

    // idCiudad
})
export default mongoose.model("CentrosFormacion", httpcentrosFormacion) 