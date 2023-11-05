import mongoose from "mongoose";

const ambienteSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    centroformacion: { type: mongoose.Schema.Types.ObjectId, ref: "CentrosFormacion", required: true },
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Ambiente", ambienteSchema) 