import mongoose from "mongoose";

const ambienteSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    centroFormacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    //archivo: { type: String, required: true },
})

export default mongoose.model("Ambiente", ambienteSchema) 