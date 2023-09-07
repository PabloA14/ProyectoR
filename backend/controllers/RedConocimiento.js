import RedesConocimiento from "../models/redesConocimiento.js";

const httpredes = {

    postRedes: async (req, res) => {
        const { codigo, denominacion } = req.body
        try {
            const redes = new RedesConocimiento({
                codigo,
                denominacion
            });
            const cod = await RedesConocimiento.findOne({ codigo: codigo });
            console.log(cod);
            if (cod) {
                return res.status(400).json({ msg: 'La red de conocimiento ya se encuentra registrada', cod });
            } else {
                await redes.save()
                return res.status(200).json({ msg: 'Registro exitoso', redes });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getRedes: async (req, res) => {
        const redes = await RedesConocimiento.find()
        res.status(200).json({ redes })
    },
    getCodigo: async (req, res) => {
        const codigo = req.params.codigo
        try {
            const cod = await RedesConocimiento.find({ codigo: codigo })
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para ${codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putRedes: async (req, res) => {
        const redId = req.params.id;
        const { codigo, denominacion } = req.body;

        try {

            const existingRed = await RedesConocimiento.findOne({ codigo: codigo });
            if (existingRed && existingRed._id.toString() !== redId) {
                return res.status(400).json({ msg: 'El código ya está registrado para otra red' });
            }

            const updatedFields = {
                codigo, denominacion
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