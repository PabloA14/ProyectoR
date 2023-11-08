import Investigacion from "../models/investigaciones.js"
import { v2 as cloudinary } from 'cloudinary';


const httpInvestigaciones = {

    postInvestigacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });
    
        const { codigo, denominacion, descripcion, fecha, idPrograma } = req.body;
        let documentoUrl = null;
    
        try {
            // Verificar si se proporciona un documento
            if (req.files && req.files.documentos) {
                const { documentos } = req.files;
    
                if (!documentos.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la petición" });
                }
    
                const extension = documentos.name.split(".").pop();
                const { tempFilePath } = documentos;
    
                // Subir el documento a Cloudinary
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    format: extension
                });
    
                documentoUrl = result.url;
            }
    
            const investigacion = new Investigacion({
                codigo,
                denominacion,
                descripcion,
                fecha,
                documentos: documentoUrl,
                idPrograma
            });
    
            const cod = await Investigacion.findOne({ codigo: codigo });
            if (cod) {
                return res.status(400).json({ msg: 'La investigación ya se encuentra registrada', cod, denominacion });
            } else {
                await investigacion.save();
                res.status(200).json({ msg: "Registro exitoso", investigacion });
            }
        } catch (error) {
            console.error('Error al agregar la investigación:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    },
    
    getinvestigaciones: async (req, res) => {
        const investigacion = await Investigacion.find().populate("idPrograma")
        res.json({ investigacion })
    },

    getCodigo: async (req, res) => {
        try {
            const investigacionBuscada = req.params.codigo;
            const investigacionEncontrada = await Investigacion.findOne({ codigo: investigacionBuscada });
            if (!investigacionEncontrada) {
                return res.status(404).json({ mensaje: 'No se encontró la investigacion  con el codigo proporcionado' });
            } else {
                res.json(investigacionEncontrada);
            }

        } catch (error) {
            console.error('Error al buscar la investigacion :', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar la investigacion ' });
        }
    },

    putninvestigacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const investigacionId = req.params.id;
        const { codigo, denominacion, descripcion, fecha } = req.body;

        try {
            const updatedFields = {
                codigo, denominacion, descripcion, fecha
            };

            // Verificar si se proporciona un nuevo documentos
            if (req.files && req.files.documentos) {
                const { documentos } = req.files;

                if (!documentos.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la petición" });
                }

                const extension = documentos.name.split(".").pop();
                const { tempFilePath } = documentos;

                // Subir el nuevo documentos a Cloudinary u otro servicio
                // Aquí se asume Cloudinary, asegúrate de ajustar según tu configuración
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    format: extension
                });

                // Agregar la URL del nuevo documentos a los campos actualizados
                updatedFields.documentos = result.url;
            }

            const existingInves = await Investigacion.findOne({ codigo: codigo });
            if (existingInves && existingInves._id.toString() !== investigacionId) {
                return res.status(400).json({ msg: 'La investigación ya se encuentra registrada' });
            }

            const updatedInvestigacion = await Investigacion.findOneAndUpdate(
                { _id: investigacionId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', instrumento: updatedInvestigacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al actualizar la información' });
        }
    }


}

export default httpInvestigaciones;