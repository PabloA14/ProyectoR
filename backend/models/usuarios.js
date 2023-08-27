import mongoose from "mongoose";

const iususarioSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    redConocimiento: { type: String, required: true },
    hojaDeVida: { type: String, required: true },
    perfilProfesional: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Usuario", iususarioSchema) 