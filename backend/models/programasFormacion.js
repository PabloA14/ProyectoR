import mongoose from 'mongoose'

const programasDeFormacion = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        denominacionPrograma: { type: String, required: true },
        nivelFormacion: { type: String, required: true },
        version: { type: String, required: true },
        estado: { type: Number, default: 1, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Programa", programasDeFormacion)