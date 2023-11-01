import mongoose from "mongoose";

const resgistroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    lugardesarrollo: { type: String, required: true },
    metodologia: { type: String, required: true },
    creditos: { type: String, required: true },
    codigosnies: { type: String, required: true },
    fecha: { type: String, required: true },
    programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa', required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Registro", resgistroSchema)