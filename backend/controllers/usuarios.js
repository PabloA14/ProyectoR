// import usuarios from "../models/usuarios.js";
import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt"


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

    getUsusarios: async (req, res) => {
        const usuarios = await Usuario.find()
            .populate("rol")
            .populate("redConocimiento")
        res.status(200).json({ usuarios })
    },

    getUsuarioCodigo: async (req, res) => {
        const Codigo = req.params.codigo
        console.log(Codigo);
        try {
            const cod = await Usuario.find({ cedula: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el usuario con la cedula  ${Codigo}` })
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
        const { cedula, nombre, apellidos, telefono, clave, correo, redConocimiento, hojaDeVida, rol, perfilProfesional } = req.body;

        try {
            const existingUser = await Usuario.findOne({ cedula: cedula });
            if (existingUser && existingUser._id.toString() !== usuarioId) {
                return res.status(400).json({ msg: 'La cédula ya está registrada para otro usuario' });
            }
            const updatedFields = {
                cedula, nombre, apellidos, telefono, correo, clave, redConocimiento, hojaDeVida, rol, perfilProfesional
            };

            if (clave) {
                const hashedPassword = await bcrypt.hash(clave, 10);
                updatedFields.clave = hashedPassword;
            }

            const updatedUsuario = await Usuario.findOneAndUpdate(
                { _id: usuarioId },
                {
                    $set: updatedFields
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
    }
};

export default httpUsuario;
