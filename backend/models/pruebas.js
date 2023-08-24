import mongoose from "mongoose";

const pruebaSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    numero: { type: String, required: true },
})

export default mongoose.model("Prueba", pruebaSchema)