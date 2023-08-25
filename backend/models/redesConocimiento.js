import mongoose from "mongoose";

const httpRedes = new mongoose.Schema({
   codigo: { type: String, require: true },
   nombre: { type: String, require: true },
   estado: { type: Number, default: 1, required: true },
   createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("RedesConocimiento", httpRedes)