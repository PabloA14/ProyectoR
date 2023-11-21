import mongoose from "mongoose";

const httpColor = new mongoose.Schema({
    colorMenu: { type: String, required: false },
    colorLetra: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Color", httpColor)