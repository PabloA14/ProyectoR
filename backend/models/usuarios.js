import mongoose from "mongoose";

const iususarioSchema = new mongoose.Schema({
    foto: { type: String, required: false },
    cedula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    redConocimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'RedesConocimiento', required: true },
    hojaDeVida: { type: String, required: false },
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'rolesUsuario', required: true },
    perfilProfesional: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    recuperacion: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Usuario", iususarioSchema) 