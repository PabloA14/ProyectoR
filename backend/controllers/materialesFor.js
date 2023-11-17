import Material from "../models/materialesFor.js"

const httpMateriales = {

    postMaterial: async (req, res) => {
        const { nombre, descripcion, tipo } = req.body
        try {
            const material = new Material({
                nombre, descripcion, tipo
            })

            await material.save()
            return res.status(200).json({ msg: 'El material de aprendizaje registrado con exito', material });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de Crear la guia de aprendizaje" })
        }
    },

    getMaterial: async (req, res) => {
        const material = await Material.find()
        res.status(200).json({ material })
    },

    
    putMaterial: async (req, res) => {
        const materialId = req.params.id
        const { codigo, nombre, descripcion, tipo } = req.body
        try {
            
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