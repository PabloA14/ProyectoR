import DesarrolloC from "../models/desarrollo.js"

const httpDesarrolloC = {

    postDesarrollo: async (req, res) => {
        const { codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica } = req.body
        try {
            const desarrolloCurricular = new DesarrolloC({
                codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica
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
        const desarrollo = await DesarrolloC.find()
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
        const Codigo = req.params.codigo;
        try {
            const updatedCodigo = await DesarrolloC.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        matrizcorrelacion: req.body.matriz,
                        proyectoFormativo: req.body.proyecto,
                        planeacionPedagogica: req.body.planeacion
                    }
                },
                { new: true }
            );

            if (!updatedCodigo) {
                return res.status(404).json({ msg: 'Red no encontrado' });
            }
            res.status(200).json({ msg: 'Desarrollo c actualizado exitosamente', red: updatedCodigo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    }

}

export default httpDesarrolloC