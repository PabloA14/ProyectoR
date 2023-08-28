import Instrumentos from "../models/instrumentos.js"

const httpDesarrolloC = {



    postInstrumentos : async (req,res) =>{
        const {codigo ,nombre ,documento} =req.body
        try{
            const instrumentosE = new Instrumentos({
                codigo ,nombre,documento
            })
            const cod = await Instrumentos.findOne({codigo :codigo})
            if (cod) {
               return res.status(400).json({ sms : "la guia de aprendizaje ya se encuentra en el sistema con el codigo", cod, nombre})

            }else{
                await instrumentosE.save()
                return res.status(200).json({ msg: 'Guia de aprendizaje registrada correctamente', instrumentosE });

            }

        }catch (error){
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de Crear la guia de aprendizaje" })
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
                res.status(400).json({ sms: `sin coincidencias para el material de evaliacion ${Codigo}` })
            } else {
                res.status(200).json({  sms : `Se encontro el material correctamente `,cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putInstrumentosE: async (req, res) => {
        const Codigo = req.params.codigo;
        try {
            const updatedinfo = await Instrumentos.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        documento: req.body.documento
                    }
                },
                { new: true }
            );

            if (!updatedinfo) {
                return res.status(404).json({ msg: 'Guia no encontrada' });
            }
            res.status(200).json({ msg: 'Guia actualizada exitosamente', red: updatedinfo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    }

}

export default httpDesarrolloC