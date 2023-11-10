import mongoose from "mongoose";

const httpDesarrollo = new mongoose.Schema({
    codigo: { type: String, required: false },
    matrizcorrelacion: { type: String, required: false },
    proyectoFormativo: { type: String, required: false },
    planeacionPedagogica: { type: String, required: false },
    idGuias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guia', required: false }],
    createdAt: { type: Date, default: Date.now },
})
export default mongoose.model("Desarrollo", httpDesarrollo)