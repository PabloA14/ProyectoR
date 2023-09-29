import CentrosF from "../models/centrosFormacion.js"

const httpCentros = {

    postCentro: async (req, res) => {
        const { codigo, nombre, direccion, ciudad } = req.body
        try {
            const centro = new CentrosF({
                codigo, nombre, direccion, ciudad
            })
            const cod = await CentrosF.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ msg: "El centro de formación ya se encuentra registrado", cod, nombre })

            } else {
                await centro.save()
                return res.status(200).json({ msg: 'Centro de formacion registrado correctamente', centro });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor" })
        }
    },

    getCentros: async (req, res) => {
        const centros = await CentrosF.find().populate("ciudad")
        res.status(200).json({ centros })
    },

    getCodigoCentro: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await CentrosF.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el centro de formacion con el codigo   ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putCentros: async (req, res) => {
        const centroId = req.params.id;
        const { codigo, nombre, direccion, ciudad } = req.body;
        try {

            const existingCentro = await CentrosF.findOne({ codigo: codigo });
            if (existingCentro && existingCentro._id.toString() !== centroId) {
                return res.status(400).json({ msg: 'El centro de formación ya se encuentra registrado' });
            }

            const updatedFields = {
                codigo, nombre, direccion, ciudad
            };

            const updatedCentro = await CentrosF.findOneAndUpdate(

                { _id: centroId },
                {
                    $set: updatedFields
                },
                { new: true }
            )

            res.status(200).json({ msg: 'Centro de formación actualizado exitosamente', centro: updatedCentro });
            console.log(updatedCentro);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  el centro de formacion' });
        }
    },
    patchCentros: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const centro = await CentrosF.findById(id);
            if (centro) {
                centro.estado = estado;
                await centro.save();
                res.json(centro);
            } else {
                res.status(404).json({ mensaje: `centro con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el centro: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

}

export default httpCentros