import Retroalimentacion from "../models/retroalimentacion-red.js"
import { v2 as cloudinary } from 'cloudinary';


const httpProyectos = {

    postRetroalimentacion: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { nombre, codigoFicha, descripcion, fecha, programa } = req.body;
        let documentoUrl = null;

        try {

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


            const retroalimentacion_red = new Retroalimentacion({
                nombre, codigoFicha, descripcion, fecha, documentos: documentoUrl, programa
            });

            await retroalimentacion_red.save();
            return res.status(200).json({ msg: 'retroalimentacion de red ingresado satisfactoriamente', retroalimentacion_red });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ha ocurrido un error en el server en el servidor de a peticion post" });
        }
    },

    getRetroalimentacion: async (req, res) => {
        const retroalimentaciones = await Retroalimentacion.find()
            .populate("programa")
        res.status(200).json({ retroalimentaciones })
    },

    putRetroalimentacion: async (req, res) => {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const retroId = req.params.id;
        const { nombre, codigoFicha, descripcion, fecha, programa } = req.body;

        try {
            const updatedFields = {
                nombre, codigoFicha, descripcion, fecha, programa
            };

            if (req.files && req.files.documentos) {
                const { documentos } = req.files;

                if (!documentos.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la petición" });
                }

                const extension = documentos.name.split(".").pop();
                const { tempFilePath } = documentos;

                // Subir el nuevo documento a Cloudinary u otro servicio
                // Aquí se asume Cloudinary, asegúrate de ajustar según tu configuración
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    width: 250,
                    crop: "limit",
                    resource_type: "raw",
                    format: extension
                });

                // Agregar la URL del nuevo documento a los campos actualizados
                updatedFields.documentos = result.url;
            }

            const updatedRetroalimetacion = await Retroalimentacion.findOneAndUpdate(
                { _id: retroId },
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
