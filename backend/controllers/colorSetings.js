import Color from "../models/colorSetings.js"


const httpColores = {

    postConfiguracion: async (req, res) => {
        try {
            const nuevaConfiguracion = new Configuracion(req.body);
            const configuracionCreada = await nuevaConfiguracion.save();
            res.status(201).json(configuracionCreada);
        } catch (error) {
            res.status(500).json({ error: "No se pudo crear la config." });
        }
    },


    postColor: async (req, res) => {
        const { colorMenu, colorLetra } = req.body;
        try {
            const nuevoColor = new Color({
                colorMenu,
                colorLetra
            });
            await nuevoColor.save();
            res.status(200).json({ msg: 'Color guardado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },

    getConfiguracion: async (req, res) => {
        try {
            const buscarColores = await Color.find();
            res.json({ buscarColores });
        } catch (error) {
            res.status(500).json({ msg: "No se pudo traer la configuracion." });
        }
    },


    getColores: async (req, res) => {
        const colores = await Color.find()
        res.status(200).json({ colores })
    },

    putColor: async (req, res) => {
        const id = req.params.id;
        try {
            const updatedColores = await Color.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        colorMenu: req.body.colorMenu,
                        colorLetra: req.body.colorLetra
                    }
                },
                { new: true }
            );

            if (!updatedColores) {
                return res.status(404).json({ msg: 'color no encontrado' });
            }
            res.status(200).json({ msg: 'Color actualizado exitosamente', red: updatedColores });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No se pudo actulizar el color' });
        }
    }

}

export default httpColores