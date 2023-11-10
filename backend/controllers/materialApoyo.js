import MaterialApoyo from "../models/materialApoyo.js"
import { v2 as cloudinary } from 'cloudinary';


const httpMatAp = {

    postMaterialApoyo: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { codigo, nombre, enlace, guia, } = req.body
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

            const matApoyo = new MaterialApoyo({
                codigo, nombre, enlace, guia, documento: documentoUrl,
            });

            /* const cod = await MaterialApoyo.findOne({ codigo: codigo });
            if (cod) {
                return res.status(400).json({ msg: 'El material ya se encuentra registrado', cod });
            } else {
                await matApoyo.save();
                res.status(200).json({ msg: "Registro exitoso", matApoyo });
            } */

            await matApoyo.save();
            res.status(200).json({ msg: "Registro exitoso", matApoyo });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momento de Crear el material" })
        }
    },

    getMaterialApoyo: async (req, res) => {
        const mat = await MaterialApoyo.find().populate("guia")
        res.status(200).json({ mat })
    },

    getMaterialApCodigo: async (req, res) => {
        const codigo = req.params.codigo
        try {
            const cod = await MaterialApoyo.findOne({ codigo: codigo }).populate('guia')
            console.log(cod);
            if (!cod) {
                res.status(400).json({ sms: `sin coincidencias para el material ${codigo}` })
            } else {
                res.status(200).json({ sms: `Se encontro el material correctamente `, cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putMaterialApoyo: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const matId = req.params.id;
        const { codigo, nombre, enlace, guia, } = req.body;

        try {
            const updatedFields = {
                codigo, nombre, enlace, guia,
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

            /* const existingMat = await MaterialApoyo.findOne({ codigo: codigo });
            if (existingMat && existingMat._id.toString() !== matId) {
                return res.status(400).json({ msg: 'El material ya se encuentra registrado' });
            } */

            const updatedMaterialesAp = await MaterialApoyo.findOneAndUpdate(
                { _id: matId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', materialApoyos: updatedMaterialesAp });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    }

}

export default httpMatAp