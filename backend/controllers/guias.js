import Guia from "../models/guias.js"
import { v2 as cloudinary } from 'cloudinary';


const httpGuias = {

    postGuia: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { codigo, nombre, fase, InstrumentosEvaluacion, MaterialApoyo } = req.body
        let documentoUrl = null;

        try {

            if (req.files && req.files.documento) {
                const { documento } = req.files;

                if (!documento.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la petición" });
                }

                const extension = documento.name.split(".").pop();
                const { tempFilePath } = documento;

                // Subir el documento a Cloudinary
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    format: extension
                });

                documentoUrl = result.url;
            }

            const guia = new Guia({
                codigo, nombre, fase, documento: documentoUrl, InstrumentosEvaluacion, MaterialApoyo
            });

            const cod = await Guia.findOne({ codigo: codigo });
            if (cod) {
                return res.status(400).json({ msg: 'La guía ya se encuentra registrada', cod });
            } else {
                await guia.save();
                res.status(200).json({ msg: "Registro exitoso", guia });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momento de Crear la guia de aprendizaje" })
        }
    },

    getGuias: async (req, res) => {
        const guia = await Guia.find()
            //.populate("MaterialApoyo")
            .populate("InstrumentosEvaluacion")
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
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const guiasId = req.params.id;
        const { codigo, nombre, fase, InstrumentosEvaluacion, MaterialApoyo } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, fase, InstrumentosEvaluacion, MaterialApoyo
            };

            // Verificar si se proporciona un nuevo documento
            if (req.files && req.files.documento) {
                const { documento } = req.files;

                if (!documento.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la petición" });
                }

                const extension = documento.name.split(".").pop();
                const { tempFilePath } = documento;

                // Subir el nuevo documento a Cloudinary u otro servicio
                // Aquí se asume Cloudinary, asegúrate de ajustar según tu configuración
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    format: extension
                });

                // Agregar la URL del nuevo documento a los campos actualizados
                updatedFields.documento = result.url;
            }

            const existingGuia = await Guia.findOne({ codigo: codigo });
            if (existingGuia && existingGuia._id.toString() !== guiasId) {
                return res.status(400).json({ msg: 'La guía ya se encuentra registrada' });
            }

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

export default httpGuias