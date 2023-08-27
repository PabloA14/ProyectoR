import mongoose from "mongoose";

const httpRedes = new mongoose.Schema({
   Codigo: { type: String, require: true },
   Denominacion: { type: String, require: true },
   createdAt: { type: Date, default: Date.now },

})

export default mongoose.model("RedesConocimiento", httpRedes)