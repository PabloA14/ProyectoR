import Registro from "../models/registroCalificado.js";
import { v2 as cloudinary } from 'cloudinary';


const httpregistro = {

    postregistro: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { titulo, lugardesarrollo, metodologia, creditos, codigosnies, fechaOtorgamiento, fechaVencimiento, programa } = req.body;
        let documentoURL = null
        try {
            // Verificar si se proporciona un documento
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

                documentoURL = result.url;
            }

            const registroC = new Registro({
                titulo, lugardesarrollo, metodologia, creditos, codigosnies, fechaOtorgamiento
                , fechaVencimiento, documento: documentoURL, programa
            });
            const cod = await Registro.findOne({ codigosnies: codigosnies });

            if (cod) {
                return res.status(400).json({ msg: 'El registro ya se encuentra registrado', cod });
            } else {
                await registroC.save()
                return res.status(200).json({ msg: 'Registro exitoso', registroC });
            }

        } catch (error) {
            console.error('Error al agregar el Registro calificado:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el el Registro calificado' });
        }
    },

    getRegistrosCalifidos: async (req, res) => {
        const registroC = await Registro.find().populate("programa")
        res.json({ registroC })
    },

    getcodigo: async (req, res) => {
        try {
            const codigoBuscado = req.params.codigosnies;
            const codigoEncontrado = await Registro.findOne({ codigosnies: codigoBuscado });
            if (!codigoEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el registro con el codigo proporcionado' });
            } else {
                res.json(codigoEncontrado);
            }

        } catch (error) {
            console.error('Error al buscar el nivel de formacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el registro' });
        }
    },

    putRegistro: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const registroId = req.params.id;
        const { titulo, lugardesarrollo, metodologia, creditos, codigosnies, fechaOtorgamiento, fechaVencimiento, programa } = req.body;

        try {
            const updatedFields = {
                titulo, lugardesarrollo, metodologia, creditos, codigosnies, fechaOtorgamiento, fechaVencimiento, programa
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

            const existingCodigo = await Registro.findOne({ codigosnies: codigosnies });
            if (existingCodigo && existingCodigo._id.toString() !== registroId) {
                return res.status(400).json({ msg: 'El registro ya se encuentra registrado' });
            }

            const updatedRegistro = await Registro.findOneAndUpdate(
                { _id: registroId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', registro: updatedRegistro });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    },


}

export default httpregistro