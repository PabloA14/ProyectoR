import mongoose from 'mongoose'

const programasDeFormacion = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        denominacionPrograma: { type: String, required: true },
        nivelFormacion: { type: mongoose.Schema.Types.ObjectId, ref: 'NivelFormacion', required: true },
        version: { type: String, required: true },
        RedConocimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'RedesConocimiento' },
        disCurricular: { type: String, required: false },
        desarrolloCurricular: { type: mongoose.Schema.Types.ObjectId, ref: 'Desarrollo' , default: null},
        instructores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
        ambienteFormacion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ambiente' }],
        materialesformacion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaterialesFormacione' }],
        estado: { type: Number, default: 1 },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Programa", programasDeFormacion)
//registrocalificado