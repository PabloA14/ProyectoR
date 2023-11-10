import mongoose from "mongoose";

const httpInstrumentosEva = new mongoose.Schema({
    codigo: { type: String, required: false },
    nombre: { type: String, required: true },
    documento: { type: String, required: false },
    guia: { type: mongoose.Schema.Types.ObjectId, ref: 'Guia', required: true },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("InstrumentosEvaluacion", httpInstrumentosEva)
