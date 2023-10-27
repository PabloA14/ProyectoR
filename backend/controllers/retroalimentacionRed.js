import Retroalimentacion from "../models/retroalimentacion-red.js"


const httpProyectos = {
    postRetroalimentacion: async (req, res) => {
        const { codigo, nombre, codigoFicha, descripcion, fecha, documentos, programa } = req.body;

        try {

            const retroalimentacion_red = new Retroalimentacion({
                codigo, nombre, codigoFicha, descripcion, fecha, documentos, programa 
            });

            const cod = await Retroalimentacion.findOne({ codigo: codigo })

            if (cod) {
                return res.status(400).json({ msg: "El proyecto ya se encuentra en el sistema con el codigo", cod, nombre });
            } else {
                await retroalimentacion_red.save();
                return res.status(200).json({ msg: 'retroalimentacion de red ingresado satisfactoriamente', retroalimentacion_red });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ha ocurrido un error en el servidor de a peticion post" });
        }
    },

    getRetroalimentacion: async (req, res) => {
        const retroalimentacion = await Retroalimentacion.find()
            .populate("programa")
        res.status(200).json({ retroalimentacion })
    },

    getCodigoRetroalimentacion: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Retroalimentacion.find({ codigo: Codigo })
                .populate("programa")
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para elProyecto con el codigo de   ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putRetroalimentacion: async (req, res) => {

        const retroalimenId = req.params.id;

        const { codigo, nombre, codigoFicha, descripcion, fecha, documentos, programa } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, codigoFicha, descripcion, fecha, documentos, programa
            };

            const updatedRetroalimetacion = await Retroalimentacion.findOneAndUpdate(
                { _id: retroalimenId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', retroalimentacion: updatedRetroalimetacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }

}

export default httpProyectos