import { text } from 'express'
import mongoose from 'mongoose'

const programasDeFormacion =new mongoose.Schema(
{
    codigo : { type : String , required :true},
    nombre :{ type :String , required :true},
    denominacionPrograma :{ type : String , required : true},
    duracion : { type : text ,  required : true},
    estado: { type: Number, default: 1, required: true },
    observacion :{ type : text , default : 'ok' ,required :false},
    createdAt: { type: Date, default: Date.now },
}
)
export default mongoose.model("Programa" , programasDeFormacion)