import Guia from "../models/guias.js"

const httpDesarrolloC = {

    postGuia: async (req, res) => {
        const { codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo } = req.body
        try {
            const guiasAp = new Guia({
                codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo
            })
            const cod = await Guia.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ sms: "la guia de aprendizaje ya se encuentra en el sistema con el codigo", cod, nombre })

            } else {

                await guiasAp.save()
                return res.status(200).json({ msg: 'Guia de aprendizaje registrada correctamente', guiasAp });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de Crear la guia de aprendizaje" })
        }
    },

    getGuias: async (req, res) => {
        const guia = await Guia.find()
            .populate("materialAPoyo")
            .populate("instrumentosEvaluacion")
        res.status(200).json({ guia })
    },

    getCodigoGuia: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Guia.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo de la guia   ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },


    putGuias: async (req, res) => {
        const guiasId = req.params.id;
        const { codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo
            };

            const updatedGuias = await Guia.findOneAndUpdate(
                { _id: guiasId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', guia: updatedGuias });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }

}

export default httpDesarrolloC