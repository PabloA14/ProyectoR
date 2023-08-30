import mongoose from "mongoose";

const nivelSchema = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        denominacion: { type: String, required: true },
        estado: { type: Number, default: 1, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)

export default mongoose.model("NivelFormacion", nivelSchema)