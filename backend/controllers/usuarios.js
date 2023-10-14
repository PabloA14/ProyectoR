import Usuario from "../models/usuarios.js";
import { generarJWT } from "../middlewares/validar-jwt.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcrypt"


const httpUsuario = {

    posUsuario: async (req, res) => {
        const { cedula, nombre, apellidos, telefono, correo, clave, redConocimiento, hojaDeVida, rol, perfilProfesional } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(clave, 10); // Hash the password

            const usuario = new Usuario({
                cedula, nombre, apellidos, telefono, correo, clave: hashedPassword, redConocimiento, hojaDeVida, rol, perfilProfesional
            });
            const buscar = await Usuario.findOne({ cedula: cedula });
            if (buscar) {
                return res.status(400).json({ msg: 'La cédula ya se encuentra registrada', buscar });
            } else {
                await usuario.save();
                res.status(200).json({ msg: 'Registro exitoso', usuario });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    loginUsuario: async (req, res) => {
        const { cedula, clave } = req.body;
        try {
            const user = await Usuario.findOne({ cedula: cedula }).populate('rol').populate('redConocimiento');

            if (!user) {
                return res.status(401).json({ msg: 'Credenciales inválidas' });
            }

            if (user.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }

            const passwordMatch = await bcrypt.compare(clave, user.clave);

            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Credenciales inválidas' });
            }

            const token = await generarJWT(user.id);

            res.status(200).json({ msg: 'Inicio de sesión exitoso', token, user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },

    getUsusarios: async (req, res) => {
        const usuarios = await Usuario.find()
            .populate("rol")
            .populate("redConocimiento")
        res.status(200).json({ usuarios })
    },

    getUsuarioCodigo: async (req, res) => {
        const Codigo = req.params.cedula
        console.log(Codigo);
        try {
            const cod = await Usuario.find({ cedula: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el usuario con la cedula ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putUsuario: async (req, res) => {
        const usuarioId = req.params.id;
        const { cedula, nombre, apellidos, telefono, correo, redConocimiento, hojaDeVida, rol, perfilProfesional } = req.body;

        try {
            const existingUser = await Usuario.findOne({ cedula: cedula });
            if (existingUser && existingUser._id.toString() !== usuarioId) {
                return res.status(400).json({ msg: 'La cédula ya está registrada para otro usuario' });
            }
            const updatedFields = {
                cedula, nombre, apellidos, telefono, correo, redConocimiento, hojaDeVida, rol, perfilProfesional
            };

            const updatedUsuario = await Usuario.findOneAndUpdate(
                { _id: usuarioId },
                {
                    $set: updatedFields
                },
                { new: true }

            );

            res.status(200).json({ msg: 'Usuario actualizado exitosamente', usuario: updatedUsuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    patchUsuario: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario) {
                usuario.estado = estado;
                await usuario.save();
                res.json(usuario);
            } else {
                res.status(404).json({ mensaje: `usuario con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el usuario: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    cargarArchivoCloudFoto: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo
            if (!req.files || Object.keys(req.files).length === 0 || !req.files.foto) {
                return res.status(400).json({ msg: "No hay archivos en la peticion" })
            }

            const { tempFilePath } = req.files.foto

            cloudinary.uploader.upload(tempFilePath,
                { width: 250, crop: "limit", resource_type: "image" },
                async function (error, result) {
                    if (result) {
                        let holder = await Usuario.findById(id);
                        if (holder.foto) {
                            const nombreTemp = holder.foto.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        holder = await Usuario.findByIdAndUpdate(id, { foto: result.url })
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
    cargarArchivoCloudHoja: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo
            if (!req.files || Object.keys(req.files).length === 0 || !req.files.hojaDeVida) {
                return res.status(400).json({ msg: "No hay archivos en la peticion" })
            }

            const { tempFilePath } = req.files.hojaDeVida
            const extension = tempFilePath.name.split('.').pop()

            cloudinary.uploader.upload(tempFilePath,
                { width: 250, crop: "limit", resource_type: "raw", format: extension },
                async function (error, result) {
                    if (result) {
                        let holder = await Usuario.findById(id);

                        if (holder.hojaDeVida) {
                            const nombreTemp = holder.hojaDeVida.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        holder = await Usuario.findByIdAndUpdate(id, { hojaDeVida: result.url })
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
};

export default httpUsuario;