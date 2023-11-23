import mongoose from "mongoose";

const httpRoles = new mongoose.Schema({
     denominacion: { type: String, require: true },
     estado: { type: Number, default: 1, required: true },
     createdAt: { type: Date, default: Date.now },
})
export default mongoose.model("rolesUsuario", httpRoles)