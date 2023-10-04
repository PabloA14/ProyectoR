import Investigacion from "../models/investigaciones.js"
import { v2 as cloudinary } from 'cloudinary';


const httpInvestigaciones = {

    postinveestigacion: async (req, res) => {
        const { codigo, denominacion, descripcion, fecha } = req.body;

        try {
            const investigacion = new Investigacion({ codigo, denominacion, descripcion, fecha });
            const cod = await Investigacion.findOne({ codigo: codigo });
            if (cod) {
                return res.status(400).json({ msg: 'La investigación ya se encuentra registrada', cod, denominacion });
            } else {
                await investigacion.save();
                res.json({ investigacion });
            }

        } catch (error) {
            console.error('Error al agregar la investigacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar la investigacion' });
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
        const investigacionId = req.params.id;
        const { codigo, denominacion, descripcion, fecha } = req.body;

        try {
            const updatedFields = {
                codigo, denominacion, descripcion, fecha
            };

            const existingInves = await Investigacion.findOne({ codigo: codigo });
            if (existingInves && existingInves._id.toString() !== rolId) {
                return res.status(400).json({ msg: 'La investigación ya se encuentra registrada' });
            }

            const updatedInvestigacion = await Investigacion.findOneAndUpdate(
                { _id: investigacionId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', investigacion: updatedInvestigacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    },
    cargarArchivo: async (req, res) => {
        const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let holder = await Investigacion.findById(id);
            //si el Holder ya tiene foto la borramos
            if (holder.documentos) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', holder.documentos);

                if (fs.existsSync(pathImage)) {
                    fs.unlinkSync(pathImage)
                }

            }

            holder = await Investigacion.findByIdAndUpdate(id, { documentos: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }

    },
    mostrarArchivo: async (req, res) => {
        const { id } = req.params

        try {
            let holder = await Investigacion.findById(id)
            if (holder.documentos) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', holder.documentos);
                if (fs.existsSync(pathImage)) {
                    return res.sendFile(pathImage)
                }
            }
            res.status(400).json({ msg: 'Falta Archivo' })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    cargarArchivoCloud: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo
            if (!req.files || Object.keys(req.files).length === 0 || !req.files.documentos) {
                return res.status(400).json({ msg: "No hay archivos en la peticion" })
            }

            const { tempFilePath } = req.files.documentos

            cloudinary.uploader.upload(tempFilePath,
                { width: 250, crop: "limit", resource_type: "raw", },
                async function (error, result) {
                    if (result) {
                        let holder = await Investigacion.findById(id);
                        if (holder.documentos) {
                            const nombreTemp = holder.documentos.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1]
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        holder = await Investigacion.findByIdAndUpdate(id, { documentos: result.url })
                        //responder
                        res.json({ url: result.url });
                    } else {
                        res.json(error)
                    }

                })
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
    },
    mostrarArchivoCloud: async (req, res) => {
        const { id } = req.params

        try {
            let holder = await Investigacion.findById(id)
            if (holder.documentos) {
                return res.json({ url: holder.documentos })
            }
            res.status(400).json({ msg: 'Falta Archivo' })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default httpInvestigaciones;