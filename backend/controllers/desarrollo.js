import DesarrolloC from "../models/desarrollo.js"

const httpDesarrolloC = {

    postDesarrollo: async (req, res) => {
        const { codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias } = req.body
        try {
            const desarrolloCurricular = new DesarrolloC({
                codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias
            })
            const cod = await DesarrolloC.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ sms: "El desarrollo curricular ya existente", cod, nombre })

            } else {
                await desarrolloCurricular.save()
                return res.status(200).json({ msg: 'El registro de la Desarrollo ha sido exitoso', desarrolloCurricular });

            }

        } catch (error) {
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de inserat" })
        }
    },

    getDesarrollosTodo: async (req, res) => {
        const desarrollo = await DesarrolloC.find().populate("idGuias")
        res.status(200).json({ desarrollo })
    },

    getCodigo: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await DesarrolloC.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo del desarrollo Curricular ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putDesarrollo: async (req, res) => {
        const desarrolloId = req.params.id;
        const { codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias } = req.body;

        try {
            const updatedFields = {
                codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias
            };

            const updatedDesarrollo = await DesarrolloC.findOneAndUpdate(
                { _id: desarrolloId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', desarrollo: updatedDesarrollo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }

}

export default httpDesarrolloC