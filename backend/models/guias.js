import mongoose from "mongoose";

const httpGuias = new mongoose.Schema({
    nombre: { type: String, required: true },
    fase: { type: String, required: false },
    documento: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Guia", httpGuias)
