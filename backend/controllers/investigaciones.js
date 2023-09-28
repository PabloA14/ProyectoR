import Investigacion from "../models/investigaciones.js"

const httpInvestigaciones = {

    postinveestigacion: async (req, res) => {
        const { codigo, denominacion, descripcion, fecha, documentos, idPrograma } = req.body;

        try {
            const investigacion = new Investigacion({ codigo, denominacion, descripcion, fecha, documentos, idPrograma });
            await investigacion.save();
            res.json({ investigacion });
        } catch (error) {
            console.error('Error al agregar la investigacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar la investigacion' });
        }
    },

    getinvestigaciones: async (req, res) => {
        const investigacion = await Investigacion.find().populate("idPrograma")
        res.json({ investigacion })
    },

    getCodigo: async (req, res) => {
        try {
            const investigacionBuscada = req.params.codigo;
            const investigacionEncontrada = await Investigacion.findOne({ codigo: investigacionBuscada });
            if (!investigacionEncontrada) {
                return res.status(404).json({ mensaje: 'No se encontró la investigacion  con el codigo proporcionado' });
            } else {
                res.json(investigacionEncontrada);
            }

        } catch (error) {
            console.error('Error al buscar la investigacion :', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar la investigacion ' });
        }
    },

    putninvestigacion: async (req, res) => {
        const investigacionId = req.params.id;
        const { codigo, denominacion, descripcion, fecha, documentos, idPRograma } = req.body;

        try {
            const updatedFields = {
                codigo, denominacion, descripcion, fecha, documentos, idPRograma
            };

            const updatedInvestigacion = await Investigacion.findOneAndUpdate(
                { _id: investigacionId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', instrumento: updatedInvestigacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }


}

export default httpInvestigaciones;