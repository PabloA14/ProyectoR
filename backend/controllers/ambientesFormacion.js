import Ambiente from "../models/ambientesFormacion.js"

const httpAmbiente = {

    postambiente: async (req, res) => {
        const { codigo, nombre, tipo, centroformacion, descripcion, archivo } = req.body;
        try {
            const codigoExiste = await Ambiente.findOne({ codigo })

            if (codigoExiste) {
                return res.status(400).json({ mensaje: 'El ambiente ya está registrado' });
            }
            else {
                const ambiente = new Ambiente({ codigo, nombre, tipo, centroformacion, descripcion, archivo });
                await ambiente.save();
                res.json({ ambiente });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el ambiente' });
        }
    },

    getAmbientes: async (req, res) => {
        const ambiente = await Ambiente.find().populate({ path: "centroformacion", populate: { path: "direccion" } })
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
        const ambienteId = req.params.id;
        const { codigo, nombre, tipo, centroformacion, descripcion, archivo } = req.body;

        try {

            const updatedFields = {
                codigo, nombre, tipo, centroformacion, descripcion, archivo
            };

            const updatedAmbiente = await Ambiente.findOneAndUpdate(
                { _id: ambienteId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'Ambiente actualizado exitosamente', ambiente: updatedAmbiente });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar el Ambiente' });
        }
    },

}


export default httpAmbiente