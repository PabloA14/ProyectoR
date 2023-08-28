import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt"

//USUARIOS 
const httpUsuario = {

    posUsuario: async (req, res) => {
        const { cedula, nombre, apellidos, telefono, clave, correo, redConocimiento, hojaDeVida, rol, perfilProfesional, estado } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(clave, 10); // Hash the password

            const usuario = new Usuario({
                cedula, nombre, apellidos, telefono, clave: hashedPassword, correo, redConocimiento, hojaDeVida, rol, perfilProfesional, estado
            });
            const buscar = await Usuario.findOne({ cedula: cedula });
            if (buscar) {
                return res.status(400).json({ msg: 'El usuario ya se encuentra registrado', buscar });
            } else {
                await usuario.save();
                res.status(200).json({ msg: 'Registro exitoso', usuario });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },

    getUsusario: async (req, res) => {
        const { cedula } = req.body
        try {
            const cc = await Usuario.find({ cedula: cedula })
            if (cc.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para ${cc}` })
            } else {
                res.status(200).json({ cc })
            }
        } catch (error) {
            res.json({ error })
        }
    },

    getUsusarios: async (req, res) => {
        const usuarios = await Usuario.find()
        res.status(200).json({ usuarios })
    },

    putUsuario: async (req, res) => {
        const usuarioId = req.params.id;

        const {
            cedula,
            nombre,
            apellidos,
            telefono,
            clave,
            correo,
            redConocimiento,
            hojaDeVida,
            rol,
            perfilProfesional,
            estado,
        } = req.body;

        try {
            // Check if the new cedula is already registered
            const existingUser = await Usuario.findOne({ cedula: cedula });
            if (existingUser && existingUser._id.toString() !== usuarioId) {
                return res.status(400).json({ msg: 'La cedula ya está registrada para otro usuario' });
            }

            const updatedFields = {
                nombre,
                apellidos,
                telefono,
                correo,
                redConocimiento,
                hojaDeVida,
                perfilProfesional,
                rol,
                estado,
            };

            if (clave) {
                // If a new password is provided, hash it
                const hashedPassword = await bcrypt.hash(clave, 10);
                updatedFields.clave = hashedPassword;
            }

            const updatedUsuario = await Usuario.findOneAndUpdate(
                { _id: usuarioId },
                {
                    $set: updatedFields,
                },
                { new: true }
            );

            if (!updatedUsuario) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            res.status(200).json({ msg: 'Usuario actualizado exitosamente', usuario: updatedUsuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },

};

export default httpUsuario;
