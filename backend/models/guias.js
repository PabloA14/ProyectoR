import mongoose from "mongoose";

const httpGuias = new mongoose.Schema({
    codigo: { type: String, require: true },
    nombre: { type: String, require: true },
    fase: { type: String, require: true },
    documento: { type: String, require: true },
    instrumentosEvaluacion: { type: mongoose.Schema.Types.ObjectId, ref: 'InstrumentosEvaluacione', require: true },
    materialAPoyo: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialesFormacione', require: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Guia", httpGuias)

// idInstrumentosEvaluacion
// IDmaterialAPoyo