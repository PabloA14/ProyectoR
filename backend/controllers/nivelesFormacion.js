import NivelFormacion from "../models/nivelesFormacion.js";

const httpNivelFormacion = {

    postnivelFormacion: async (req, res) => {
        const { denominacion } = req.body;

        try {
            const nivelformacion = new NivelFormacion({ denominacion });

            await nivelformacion.save()
            return res.status(200).json({ msg: 'Registro exitoso', nivelformacion });

        } catch (error) {
            console.error('Error al agregar el nivel de formación:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el nivel de formacion' });
        }
    },

    getNivelesFormacion: async (req, res) => {
        const nivelFormacion = await NivelFormacion.find()
        res.json({ nivelFormacion })
    },
    
    putnivelFormacion: async (req, res) => {
        const nivelId = req.params.id
        const { denominacion } = req.body;
        try {
            
            const updatedFields = {
                denominacion
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