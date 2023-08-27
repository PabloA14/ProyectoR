
import mongoose from 'mongoose'
//ciudades

const httpCiudades = new mongoose.Schema(
    {
        codigoCiudad: { type: String, required: true },
        nombre: { type: String, required: true },
        region: { type: String, required: true },
        departamento: { type: String,  required: false },
        codDepartamento: { type: String, required: false },
        estado: { type: Number, default: 1, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Ciudad", httpCiudades)