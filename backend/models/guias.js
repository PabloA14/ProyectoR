import mongoose from "mongoose";

const httpGuias = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    fase: { type: String, required: false },
    documento: { type: String, required: true },
    InstrumentosEvaluacion: { type: mongoose.Schema.Types.ObjectId, ref: 'InstrumentosEvaluacion', required: false },
    MaterialApoyo: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialApoyo', required: false },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Guia", httpGuias)
