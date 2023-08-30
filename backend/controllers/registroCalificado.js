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
        const Codigo = req.params.codigo;
        try {
            const updatedRegistro = await Registro.findOneAndUpdate(
                { codigosnies: Codigo },
                {
                    $set: {
                        titulo: req.body.titulo,
                        lugadesarrollo: req.body.lugar,
                        metodologia: req.body.metodologia,
                        creditos: req.body.creditos,
                        fecha: req.body.fecha,
                        documento: req.body.documento
                    }
                },
                { new: true }
            );

            if (!updatedRegistro) {
                return res.status(404).json({ msg: 'registro  no encontrado' });
            }
            res.status(200).json({ msg: 'Guia actualizada exitosamente', red: updatedRegistro });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  registro' });
        }
    }




}

export default httpregistro