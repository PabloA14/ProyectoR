import CentrosF from "../models/centrosFormacion.js"

const httpCentros = {

    postCentro: async (req, res) => {
        const { codigo, nombre, ciudad, direccion } = req.body
        try {
            const centro = new CentrosF({
                codigo, nombre, ciudad, direccion
            })
            const cod = await CentrosF.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ sms: "El centro de formacion ya se encuentra registrado", cod, nombre })

            } else {
                await centro.save()
                return res.status(200).json({ msg: 'Centro de formacion registrado correctamente', centro });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de Crear la guia de aprendizaje" })
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
        const redId = req.params.id;
        const { codigo, nombre, direccion, ciudad } = req.body;
        try {
            console.log("Put centro");
            const updatedFields = {
                codigo, nombre, direccion, ciudad
            };

            const updatedCentro = await CentrosF.findOneAndUpdate(

                { _id: redId },
                {
                    $set: updatedFields
                },
                { new: true }
            ).populate("ciudad");

            await updatedCentro.save()

            res.status(200).json({ msg: 'Centro de formacion actualizado exitosamente', centro: updatedCentro });
            console.log(updatedCentro);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  el centro de formacion' });
        }
    },

}

export default httpCentros