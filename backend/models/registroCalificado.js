import mongoose from "mongoose";

const resgistroSchema = new mongoose.Schema({
    snies: { type: String, required: true },
    nombrePrograma: { type: String, required: true },
    tituloOtorgado: { type: String, required: true },
    fechaOferta: { type: String, required: true },
    metodilogia: { type: String, required: true },
    fechaResolucion: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Resgistro", resgistroSchema)