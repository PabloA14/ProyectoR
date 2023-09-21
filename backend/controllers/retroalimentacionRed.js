import Retroalimentacion from "../models/retroalimentacion-red.js"
import Programa from "../models/programasFormacion.js"


const httpProyectos = {
    postRetroalimentacion: async (req, res) => {
        const { codigo, nombre, descripcion, fecha, documentos, programa } = req.body;

        try {
            const programaEncontrado = await Programa.findOne({ codigo: programa });


            if (!programaEncontrado) {
                return res.status(400).json({ msg: "Programa no encontrado con el código proporcionado" });
            }

            const retroalimentacion_red = new Retroalimentacion({
                codigo, nombre, descripcion, fecha, documentos, programa: programaEncontrado
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
            return res.status(500).json({ msg: "Ha ocurrido un error en el servidor al momento de crear el proyecto" });
        }
    },

    getRetroalimentacion: async (req, res) => {
        const retroalimentaciones = await Retroalimentacion.find()
            .populate("programa")
        res.status(200).json({ retroalimentaciones })
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
        const { titulo, lugadesarrollo, metodologia, creditos, fecha, documento } = req.body;

        try {
            const updatedFields = {
                titulo, lugadesarrollo, metodologia, creditos, fecha, documento
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