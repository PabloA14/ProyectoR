import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos :{type :String , required : true},
    telefono: { type: String, required: true },
    clave : {type :String ,required: true},
    experiencia: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    redConocimiento: { type: String, required: true },
    hojaDeVida: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Instructor", instructorSchema) 