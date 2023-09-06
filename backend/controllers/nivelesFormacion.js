import NivelFormacion from "../models/nivelesFormacion.js";

const httpNivelFormacion = {

    postnivelFormacion: async (req, res) => {
        const { codigo, denominacion } = req.body;

        try {
            const nivelformacion = new NivelFormacion({ codigo, denominacion });
            await nivelformacion.save();
            res.json({ nivelformacion });
        } catch (error) {
            console.error('Error al agregar el nivel de formación:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el nivel de formacion' });
        }
    },

    getNivelesFormacion: async (req, res) => {
        const nivelFormacion = await NivelFormacion.find()
        res.json({ nivelFormacion })
    },

    getCodigonivel: async (req, res) => {
        try {
            const nivelBuscado = req.params.codigo;
            const nivelEncontrado = await NivelFormacion.findOne({ codigo: nivelBuscado });
            if (!nivelEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el nivel de formacion con el codigo proporcionado' });
            } else {
                res.json(nivelEncontrado);
            }

        } catch (error) {
            console.error('Error al buscar el nivel de formacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el nivel de formacion' });
        }
    },


    putnivelFormacion: async (req, res) => {
        const nivelId = req.params.id
        const { codigo, denominacion } = req.body;

        try {

            const existingNivel = await NivelFormacion.findOne({ codigo: codigo });
            if (existingNivel && existingNivel._id.toString() !== redId) {
                return res.status(400).json({ msg: 'El código ya está registrado para otro nivel' });
            }


            const updatedFields = {
                codigo, denominacion
            };

            const updateniveles = await NivelFormacion.findOneAndUpdate(
                { _id: nivelId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            if (!updateniveles) {
                return res.status(404).json({ msg: 'No encontrado' });
            }
            res.status(200).json({ msg: 'Nivel de formación actualizado exitosamente', nivel: updateniveles });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }

}

export default httpNivelFormacion