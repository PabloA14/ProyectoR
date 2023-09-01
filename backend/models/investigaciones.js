import mongoose from 'mongoose'

const investigacionSchema = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        denominacion: { type: String, required: true },
        descripcion: { type: String, required: true },
        fecha: { type: String, required: true },
        documentos: { type: String, required: true },
        idPRograma: { type: String, required: true },
        estado: { type: Number, default: 1, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Investigacion", investigacionSchema)