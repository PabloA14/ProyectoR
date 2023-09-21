import mongoose from 'mongoose'

const programasDeFormacion = new mongoose.Schema(
    {
        codigo: { type: String, required: true },
        denominacionPrograma: { type: String, required: true },
        nivelFormacion: { type: mongoose.Schema.Types.ObjectId, ref: 'NivelFormacion', required: true },
        version: { type: String, required: true },
        RedConocimiento: { type: mongoose.Schema.Types.ObjectId, ref: 'RedesConocimiento', default: 1, required: true },
        disCurricular: { type: String, ref: '', default: 1,},
        desarrolloCurricular: { type: mongoose.Schema.Types.ObjectId, ref: 'Desarrollo', default: 1,},
        instructores: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: 1,},
        ambienteFormacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambiente', default: 1,},
        materialesformacion: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialesFormacione', default: 1,},
        registrocalificado: { type: mongoose.Schema.Types.ObjectId, ref: 'Registro', default: 1,},
        estado: { type: Number, default: 1,  },
        createdAt: { type: Date, default: Date.now },
    }
)
export default mongoose.model("Programa", programasDeFormacion)