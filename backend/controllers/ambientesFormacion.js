import Ambiente from "../models/ambientesFormacion.js"

const httpAmbiente = {

    postambiente: async (req, res) => {
        const { codigo, nombre, centroformacion, descripcion, archivo } = req.body;
        try {
            const codigoExiste = await Ambiente.findOne({ codigo })

            if (codigoExiste) {
                return res.status(400).json({ mensaje: 'El ambiente ya está registrado' });
            }
            else {
                const ambiente = new Ambiente({ codigo, nombre, centroformacion, descripcion, archivo });
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
        const { codigo, nombre, centroformacion, descripcion, archivo } = req.body;

        try {
            const existingAmbiente = await Ambiente.findOne({ codigo: codigo });
            if (existingAmbiente && existingAmbiente._id.toString() !== ambienteId) {
                return res.status(400).json({ msg: 'El código ya está registrado para otro ambiente' });
            }

            const updatedFields = {
                codigo, nombre, centroformacion, descripcion, archivo
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
    }

    patchAmbientes: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const ambiente = await Ambiente.findById(id);
            if (ambiente) {
                ambiente.estado = estado;
                await ambiente.save();
                res.json(ambiente);
            } else {
                res.status(404).json({ mensaje: `ambiente con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el ambiente: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}


export default httpAmbiente