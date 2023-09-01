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

    getUsusarios: async (req, res) => {
        const usuarios = await Usuario.find()
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
            const existingUser = await Usuario.findOne({ cedula: cedula });
            if (existingUser && existingUser._id.toString() !== usuarioId) {
                return res.status(400).json({ msg: 'La cédula ya está registrada para otro usuario' });
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
    patchUsuario: async (req, res) => {
        const cedula = req.params.id;
        const { estado } = req.body;
        try {
          const usuary = await Usuario.findById(cedula);
          if (usuary) {
            usuary.estado = estado;
            await usuary.save();
            res.json(usuary);
          } else {
          return  res.status(404).json({ msg: `usuario no encotrado con id: ${id} ` });
          }
        } catch (error) {
            console.log(error);
         return res.status(500).json({ msg: "Error interno del servidor" });
        }
      }

};

export default httpUsuario;
