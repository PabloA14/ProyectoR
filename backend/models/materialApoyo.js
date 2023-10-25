import mongoose from "mongoose";

const materialAp = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    documento: { type: String, required: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("MaterialApoyo", materialAp)
