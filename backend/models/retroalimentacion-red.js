import mongoose from "mongoose";

const retroalimentacionRed = new mongoose.Schema ({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    codigoFicha  : {type : String , require :true},
    descripcion :{type :String , require :true} ,
    fecha :{type :String ,require :true},
    documentos :{type :String , require :true},
    programa:{type:mongoose.Schema.Types.ObjectId,ref:'Programa',require:true},
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }


})

export default mongoose.model("retroalimentacionRede", retroalimentacionRed)