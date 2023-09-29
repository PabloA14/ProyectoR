import mongoose from "mongoose"

const httpcentrosFormacion = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("CentrosFormacion", httpcentrosFormacion) 