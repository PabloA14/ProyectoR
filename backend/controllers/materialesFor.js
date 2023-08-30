import Material from "../models/materialesFor.js"

const httpMateriales = {

    postMaterial: async (req, res) => {
        const { codigo, nombre, descripcion, tipo, documentacion } = req.body
        try {
            const material = new Material({
                codigo, nombre, descripcion, tipo, documentacion
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

    putCodigo: async (req, res) => {
        const Codigo = req.params.codigo;
        try {
            const updatedMaterial = await Material.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        documento: req.body.proyecto
                    }
                },
                { new: true }
            );

            if (!updatedMaterial) {
                return res.status(404).json({ msg: 'material  de formacion no encontrado el la base de datos' });
            }
            res.status(200).json({ msg: 'material actualizado exitosamente', red: updatedMaterial });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  materiales de formacion' });
        }
    }

}

export default httpMateriales