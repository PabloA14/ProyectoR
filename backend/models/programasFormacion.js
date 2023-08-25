
import mongoose from 'mongoose'
//ciuuuuuuuuuuuuu
const programasDeFormacion = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        denominacionPrograma: { type: String, required: true },
        duracion: { type: String, required: true },
        observacion: { type: String, default: 'ok', required: false },
        estado: { type: Number, default: 1, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Programa", programasDeFormacion)