import mongoose from "mongoose";

const materialAp = new mongoose.Schema({
    codigo: { type: String, required: false },
    nombre: { type: String, required: true },
    enlace: { type: String, required: false },
    documento: { type: String, required: false },
    guia: { type: mongoose.Schema.Types.ObjectId, ref: 'Guia', required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("MaterialApoyo", materialAp)
