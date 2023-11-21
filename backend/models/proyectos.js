import mongoose from "mongoose";

const proyectos = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    version: { type: String, required: true },
    documento: { type: String, required: true },
    programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa', required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Proyecto", proyectos)