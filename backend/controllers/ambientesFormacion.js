import Ambiente from "../models/ambientesFormacion.js"

const httpAmbiente = {
    //vero

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
        const ambienteId = req.params.id;
        const newData = req.body;

        try {
            const ambienteExistente = await Ambiente.findOne({  codigo: newData.codigo });

            if (ambienteExistente && ambienteExistente._id.toString() !== ambienteId) {
                return res.status(400).json({ mensaje: 'El código ya está registrado.' });
            }
            
            const ambienteEncontrado = await Ambiente.findById(ambienteId);
            if (!ambienteEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el ambiente con el ID proporcionado.' });
            }

            await Ambiente.findByIdAndUpdate(ambienteId, newData);

            const ambienteActualizado = await Ambiente.findById(ambienteId);
            res.json({ ambiente: ambienteActualizado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el ambiente.' });
        }
    },

}


export default httpAmbiente