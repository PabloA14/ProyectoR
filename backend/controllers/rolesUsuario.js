import rolesUsuario from "../models/rolesUsuario.js";


const httpredes = {

    postRoles: async (req, res) => {
        const { Codigo, Denominacion, Estado } = req.body
        try {
            const roles = new rolesUsuario({
                Codigo,
                Denominacion,
                Estado
            });
            const cod = await rolesUsuario.findOne({ Codigo: Codigo });
            if (cod) {
                return res.status(400).json({ msg: 'El rol ya se encuentra existente', cod, Denominacion });
            } else {
                await roles.save()
                return res.status(200).json({ msg: 'Registro exitoso', roles });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getRoles: async (req, res) => {
        const roles = await rolesUsuario.find()
        res.status(200).json({ roles })
    },
    getCodigo: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await rolesUsuario.find({ Codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo de Rol ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putRoles: async (req, res) => {
        const Codigo = req.params.codigo;
        try {
            const updatedRed = await rolesUsuario.findOneAndUpdate(
                { Codigo: Codigo },
                {
                    $set: {
                        Denominacion: req.body.Denominacion,
                    }
                },
                { new: true }
            );
            if (!updatedRed) {
                return res.status(404).json({ msg: 'Rol de usuario no encontrado' });
            }
            res.status(200).json({ msg: 'Rol de Usuario actualizada exitosamente', red: updatedRed });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  Roles' });
        }
    }

}

export default httpredes