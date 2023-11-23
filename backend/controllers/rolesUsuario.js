import rolesUsuario from "../models/rolesUsuario.js";


const httpRoles = {

    postRoles: async (req, res) => {
        const { denominacion } = req.body
        try {
            const roles = new rolesUsuario({
                denominacion
            });

            await roles.save()
            return res.status(200).json({ msg: 'Registro exitoso', roles });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getRoles: async (req, res) => {
        const roles = await rolesUsuario.find()
        res.status(200).json({ roles })
    },
    
    /* getCodigo: async (req, res) => {
        const codigo = req.params.codigo
        try {
            const cod = await rolesUsuario.find({ codigo: codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo de Rol ${codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    }, */

    putRoles: async (req, res) => {
        const rolId = req.params.id
        const { denominacion } = req.body
        try {

            const updatedFields = {
                denominacion
            };

            const updatedRol = await rolesUsuario.findOneAndUpdate(
                { _id: rolId },
                {
                    $set: updatedFields
                },
                { new: true }
            );
            if (!updatedRol) {
                return res.status(404).json({ msg: 'Rol de usuario no encontrado' });
            }
            res.status(200).json({ msg: 'Rol de Usuario actualizado exitosamente', rol: updatedRol });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  Roles' });
        }
    },
    patchRoles: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const rol = await rolesUsuario.findById(id);
            if (rol) {
                rol.estado = estado;
                await rol.save();
                res.json(rol);
            } else {
                res.status(404).json({ mensaje: `rol con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el rol: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}

export default httpRoles