import Registro from "../models/registroCalificado.js";

const httpregistro = {

    postregistro: async (req, res) => {
        const { titulo, lugadesarrollo, metodologia, creditos, codigosnies, fecha, documento } = req.body;

        try {
            const registroC = new Registro({ titulo, lugadesarrollo, metodologia, creditos, codigosnies, fecha, documento });
            await registroC.save();
            res.json({ registroC });
        } catch (error) {
            console.error('Error al agregar el Registro calificado:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el el Registro calificado' });
        }
    },

    getRegistrosCalifidos: async (req, res) => {
        const registroC = await Registro.find()
        res.json({ registroC })
    },

    getcodigo: async (req, res) => {
        try {
            const codigoBuscado = req.params.codigosnies;
            const codigoEncontrado = await Registro.findOne({ codigosnies: codigoBuscado });
            if (!codigoEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el registro con el codigo proporcionado' });
            } else {
                res.json(codigoEncontrado);
            }

        } catch (error) {
            console.error('Error al buscar el nivel de formacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el registro' });
        }
    },

    putRegistro: async (req, res) => {
        const registroId = req.params.id;
        const { titulo, lugadesarrollo, metodologia, creditos, fecha, documento } = req.body;

        try {
            const updatedFields = {
                titulo, lugadesarrollo, metodologia, creditos, fecha, documento
            };

            const updatedRegistro = await Registro.findOneAndUpdate(
                { _id: registroId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', registro: updatedRegistro });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    },


}

export default httpregistro