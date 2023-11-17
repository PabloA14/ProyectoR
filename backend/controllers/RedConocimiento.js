import RedesConocimiento from "../models/redesConocimiento.js";

const httpredes = {

    postRedes: async (req, res) => {
        const { denominacion } = req.body
        try {
            const redes = new RedesConocimiento({
                denominacion
            });

            await redes.save()
            return res.status(200).json({ msg: 'Registro exitoso', redes });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getRedes: async (req, res) => {
        const redes = await RedesConocimiento.find()
        res.status(200).json({ redes })
    },
    putRedes: async (req, res) => {
        const redId = req.params.id;
        const { denominacion } = req.body;

        try {

            const updatedFields = {
                denominacion
            };

            const updatedRed = await RedesConocimiento.findOneAndUpdate(
                { _id: redId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'Red de conocimiento actualizada exitosamente', red: updatedRed });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  Redes' });
        }
    },

    patchRedes: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const red = await RedesConocimiento.findById(id);
            if (red) {
                red.estado = estado;
                await red.save();
                res.json(red);
            } else {
                res.status(404).json({ mensaje: `red con id: ${id} no encontrada` });
            }
        } catch (error) {
            console.log(`Error al actualizar la red: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpredes