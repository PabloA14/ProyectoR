import mongoose from "mongoose";

const httpMaterialesF = new mongoose.Schema({
    codigo: { type: String, require: true },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    tipo: { type: String, require: true },
    documentacion: { type: String, require: true },
    estado: { type: Number, default: 1, required: true },
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("MaterialesFormacione", httpMaterialesF)
