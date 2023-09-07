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
            console.log(error);
            res.status(502).json({ msg: 'ha ocurrido un error al momento de hacer el cambio' });
            return error
        }
    },
    patchNiveles: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const nivel = await NivelFormacion.findById(id);
            if (nivel) {
                nivel.estado = estado;
                await nivel.save();
                res.json(nivel);
            } else {
                res.status(404).json({ mensaje: `nivel con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el nivel: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } 

}

export default httpNivelFormacion