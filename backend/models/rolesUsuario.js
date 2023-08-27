import mongoose from "mongoose";

const httpRoles = new mongoose.Schema({
     Codigo: { type: String, require: true },
     Denominacion: { type: String, require: true },
     Estado: { type: Number, default: 1, required: true },
     createdAt: { type: Date, default: Date.now },
})
export default mongoose.model("rolesUsuario", httpRoles)