import mongoose from "mongoose";

const nivelSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    disCurricular: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("NivelFormacion", nivelSchema)