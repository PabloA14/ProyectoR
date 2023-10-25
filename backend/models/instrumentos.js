import mongoose from "mongoose";

const httpInstrumentosEva = new mongoose.Schema({
    codigo: { type: String, require: true },
    nombre: { type: String, require: true },
    documento: { type: String, require: false },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("InstrumentosEvaluacione", httpInstrumentosEva)
