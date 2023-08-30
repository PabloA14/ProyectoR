import Ambiente from "../models/ambientesFormacion.js"

const httpAmbiente = {

    postambiente: async (req, res) => {
        const { codigo, nombre, tipo, centroFormacion, descripcion, archivo } = req.body;
        try {
            const codigoExiste = await Ambiente.findOne({ codigo })

            if (codigoExiste) {
                return res.status(400).json({ mensaje: 'El ambiente ya está registrado' });
            }
            else {
                const ambiente = new Ambiente({ codigo, nombre, tipo, centroFormacion, descripcion, archivo });
                await ambiente.save();
                res.json({ ambiente });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el ambiente' });
        }
    },

    getAmbientes: async (req, res) => {
        const ambiente = await Ambiente.find()
        res.json({ ambiente })
    },

    getCodigo: async (req, res) => {
        try {
            const ambienteBuscado = req.params.codigo;
            const ambienteEncontrado = await Ambiente.findOne({ codigo: ambienteBuscado });
            if (!ambienteEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el ambiente con el codigo proporcionado' });
            }
            res.json(ambienteEncontrado);
        } catch (error) {
            console.error('Error al buscar el ambiente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el ambiente.' });
        }
    },

    putAmbiente: async (req, res) => {
        const Codigo = req.params.codigo;
        try {
            const updatedAmbiente = await Ambiente.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        codigo: req.body.codigo,
                        nombre: req.body.nombre,
                        tipo: req.body.tipo,
                        centroFormacion: req.body.centroFormacion,
                        descripcion: req.body.descripcion,
                        archivo: req.body.archivo,
                        estado: req.body.estado
                    }
                },
                { new: true }
            );

            if (!updatedAmbiente) {
                return res.status(404).json({ msg: 'ambiente no encontrada' });
            }
            res.status(200).json({ msg: 'Guia actualizada exitosamente', red: updatedAmbiente });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    },

}


export default httpAmbiente