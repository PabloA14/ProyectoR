import Usuario from "../models/usuarios.js";

const httpUsuario = {

    posUsuario: async (req, res) => {
        const { cedula, nombre, apellidos, telefono, clave, correo, fechaNacimiento, redConocimiento, hojaDeVida, perfilProfesional, estado } = req.body;

        try {
            const usuario = new Usuario({
                cedula, nombre, apellidos, telefono, clave, correo, fechaNacimiento, redConocimiento, hojaDeVida, perfilProfesional, estado
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
        const { cedula, nombre, apellidos, telefono, experiencia, redConocimiento, perfilProfesional } = req.body;

        try {
            const updatedUsuario = await Usuario.findOneAndUpdate(
                { cedula: cedula },
                {
                    $set: {
                        nombre,
                        apellidos,
                        telefono,
                        experiencia,
                        redConocimiento,
                        perfilProfesional
                    }
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
    }

};

export default httpUsuario;
