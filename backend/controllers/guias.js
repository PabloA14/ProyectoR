import Guias from "../models/guias.js"

const httpDesarrolloC = {

    postGuia: async (req, res) => {
        const { codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo } = req.body
        try {
            const guiasAp = new Guias({
                codigo, nombre, fase, documento, instrumentosEvaluacion, materialAPoyo
            })
            const cod = await Guias.findOne({ codigo: codigo })
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
        const guia = await Guias.find()
            .populate("materialAPoyo")
            .populate("instrumentosEvaluacion")
        res.status(200).json({ guia })
    },

    getCodigoGuia: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Guias.find({ codigo: Codigo })
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
        const Codigo = req.params.codigo;
        try {
            const updatedGuia = await Guias.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        fase: req.body.matriz,
                        documento: req.body.documento,
                        instrumentosEvaluacion: req.body.instrumentosEvaluacion,
                        materialAPoyo: req.body.materialAPoyo
                    }
                },
                { new: true }
            );

            if (!updatedGuia) {
                return res.status(404).json({ msg: 'Guia no encontrada' });
            }
            res.status(200).json({ msg: 'Guia actualizada exitosamente', red: updatedGuia });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    }

}

export default httpDesarrolloC