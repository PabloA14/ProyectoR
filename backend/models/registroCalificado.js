import mongoose from "mongoose";

const resgistroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    lugadesarrollo: { type: String, required: true },
    metodologia: { type: String, required: true },
    creditos: { type: String, required: true },
    codigosnies: { type: String, required: true },
    fecha: { type: String, required: true },
    documento: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Registro", resgistroSchema)