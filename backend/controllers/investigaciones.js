import Investigacion from "../models/investigaciones.js"

const httpInvestigaciones = {

    postinveestigacion: async (req, res) => {
        const { codigo, denominacion, descripcion, fecha, documentos, idPRograma } = req.body;

        try {
            const investigacion = new Investigacion({ codigo, denominacion, descripcion, fecha, documentos, idPRograma });
            await investigacion.save();
            res.json({ investigacion });
        } catch (error) {
            console.error('Error al agregar la investigacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar la investigacion' });
        }
    },

    getinvestigaciones: async (req, res) => {
        const investigacion = await Investigacion.find()
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
        const Codigo = req.params.codigo;

        try {
            const updateniveles = await Investigacion.findOneAndUpdate(
                //codigo unico / params
                { codigo: Codigo },
                {
                    $set: {
                        codigo: req.body.codigo,
                        denominacion: req.body.denominacion,
                        descripcion : req.body.descripcion,
                        fecha: req.body.fecha,
                        documentos: req.body.documentos,
                        idPRograma: req.body.idPRograma,
                    }
                },
                { new: true }
            );

            if (!updateniveles) {
                return res.status(404).json({ msg: 'investigacion no encontrado' });
            }
            res.status(200).json({ msg: 'investigacion actualizada exitosamente', red: updateniveles });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  investigacion' });
        }
    }

}

export default httpInvestigaciones;