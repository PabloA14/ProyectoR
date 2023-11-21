import Proyectos from "../models/proyectos.js"
import { v2 as cloudinary } from 'cloudinary';


const httpProyectos = {
    postProyecto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { nombre, descripcion, fecha, version, programa } = req.body;
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

            const proyecto = new Proyectos({
                nombre, descripcion, fecha, version, documento: documentoUrl, programa
            });

            await proyecto.save();
            return res.status(200).json({ msg: 'Proyecto ingresado satisfactoriamente', proyecto });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ha ocurrido un error en el servidor al momento de crear el proyecto" });
        }
    },

    getProyecto: async (req, res) => {
        const proyecto = await Proyectos.find()
            .populate("programa")
        res.status(200).json({ proyecto })
    },


    putProyecto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const proyectoId = req.params.id
        const { nombre, descripcion, fecha, version, programa } = req.body;

        try {
            const updatedFields = {
                nombre, descripcion, fecha, version, programa
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

            const updatedProyecto = await Proyectos.findOneAndUpdate(
                { _id: proyectoId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', proyecto: updatedProyecto });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al actualizar la información' });
        }
    }
}

export default httpProyectos