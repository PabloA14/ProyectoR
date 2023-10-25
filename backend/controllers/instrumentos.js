import Instrumentos from "../models/instrumentos.js"

const httpInstrumentos = {

    postInstrumentos: async (req, res) => {
        const { codigo, nombre, documento } = req.body
        try {
            const instrumentosE = new Instrumentos({
                codigo, nombre, documento
            })
            const cod = await Instrumentos.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ msg: "El instrumento ya se encuentra en el sistema con el codigo", cod, nombre })

            } else {
                await instrumentosE.save()
                return res.status(200).json({ msg: 'Instrumento registrado correctamente', instrumentosE });

            }

        } catch (error) {
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de crear el registro" })
        }
    },

    getInstrumentos: async (req, res) => {
        const inst = await Instrumentos.find()
        res.status(200).json({ inst })
    },

    getInstrumentoCodigo: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Instrumentos.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el instrumento ${Codigo}` })
            } else {
                res.status(200).json({ sms: `Se encontro el instrumento correctamente `, cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putInstrumentosE: async (req, res) => {
        const instrumentosId = req.params.id;
        const { codigo, nombre, documento, } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, documento
            };

            const updatedInstrumentos = await Instrumentos.findOneAndUpdate(
                { _id: instrumentosId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', instrumento: updatedInstrumentos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }

}

export default httpInstrumentos