import Material from "../models/materialesFor.js"

const httpMateriales = {

    postMaterial: async (req, res) => {
        const { codigo, nombre, descripcion, tipo } = req.body
        try {
            const material = new Material({
                codigo, nombre, descripcion, tipo
            })

            const cod = await Material.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ sms: "el material de aprendizaje ya se encuentra en el sistema con el codigo", cod, nombre })

            } else {
                await material.save()
                return res.status(200).json({ msg: 'El material de aprendizaje registrado con exito', material });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de Crear la guia de aprendizaje" })
        }
    },

    getMaterial: async (req, res) => {
        const material = await Material.find()
        res.status(200).json({ material })
    },

    getCodigoMaterial: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Material.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo de ese material de aprendizaje   ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putMaterial: async (req, res) => {
        const materialId = req.params.id
        const { codigo, nombre, descripcion, tipo } = req.body
        try {
            const existingMaterial = await Material.findOne({ codigo: codigo });
            if (existingMaterial && existingMaterial._id.toString() !== materialId) {
                return res.status(400).json({ msg: 'El código ya está registrado para otro material' });
            }

            const updatedFields = {
                codigo, nombre, descripcion, tipo
            };

            const updatedMaterial = await Material.findOneAndUpdate(
                { _id: materialId },
                {
                    $set: updatedFields

                },
                { new: true }
            );

            if (!updatedMaterial) {
                return res.status(404).json({ msg: 'material  de formacion no encontrado el la base de datos' });
            }
            res.status(200).json({ msg: 'material actualizado exitosamente', material: updatedMaterial });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  materiales de formacion' });
        }
    },
    patchMaterial: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const material = await Material.findById(id);
            if (material) {
                material.estado = estado;
                await material.save();
                res.json(material);
            } else {
                res.status(404).json({ mensaje: `material con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el material: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpMateriales