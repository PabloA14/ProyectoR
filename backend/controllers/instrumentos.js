import Instrumentos from "../models/instrumentos.js"
import { v2 as cloudinary } from 'cloudinary';


const httpInstrumentos = {


    postInstrumentos: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { codigo, nombre, guia, } = req.body
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

            const instrumento = new Instrumentos({
                codigo, nombre, guia, documento: documentoUrl,
            });

            const cod = await Instrumentos.findOne({ codigo: codigo });
            if (cod) {
                return res.status(400).json({ msg: 'El instrumento ya se encuentra registrado', cod });
            } else {
                await instrumento.save();
                res.status(200).json({ msg: "Registro exitoso", instrumento });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momento de Crear el instrumento" })
        }
    },

    getInstrumentos: async (req, res) => {
        const inst = await Instrumentos.find().populate("guia")
        res.status(200).json({ inst })
    },

    getInstrumentoCodigo: async (req, res) => {
        const codigo = req.params.codigo
        try {
            const cod = await Instrumentos.find({ codigo: codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el instrumento ${codigo}` })
            } else {
                res.status(200).json({ sms: `Se encontro el instrumento correctamente `, cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putInstrumentosE: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const istrumentosId = req.params.id;
        const { codigo, nombre, guia, } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, guia,
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

            const existingInstrumento = await Instrumentos.findOne({ codigo: codigo });
            if (existingInstrumento && existingInstrumento._id.toString() !== istrumentosId) {
                return res.status(400).json({ msg: 'El instrumento ya se encuentra registrado' });
            }

            const updatedInstrumentos = await Instrumentos.findOneAndUpdate(
                { _id: istrumentosId },
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