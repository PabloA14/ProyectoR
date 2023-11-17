import Ambiente from "../models/ambientesFormacion.js"

const httpAmbiente = {

    postambiente: async (req, res) => {
        const { nombre, centroformacion, tipo, descripcion } = req.body;
        try {

            const ambiente = new Ambiente({ nombre, centroformacion, tipo, descripcion });
            await ambiente.save();
            res.json({ ambiente });


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el ambiente' });
        }
    },

    getAmbientes: async (req, res) => {
        const ambiente = await Ambiente.find().populate(
            {
                path: "centroformacion",
                populate: { path: "direccion" }
            })
        res.json({ ambiente })
    },

    
    putAmbiente: async (req, res) => {
        const ambienteId = req.params.id;
        const { nombre, centroformacion, tipo, descripcion } = req.body;

        try {
            
            const updatedFields = {
                nombre, centroformacion, tipo, descripcion
            };

            const updatedAmbiente = await Ambiente.findOneAndUpdate(
                { _id: ambienteId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'Ambiente actualizado exitosamente', ambiente: updatedAmbiente });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar el Ambiente' });
        }
    },

    patchAmbientes: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const ambiente = await Ambiente.findById(id);
            if (ambiente) {
                ambiente.estado = estado;
                await ambiente.save();
                res.json(ambiente);
            } else {
                res.status(404).json({ mensaje: `ambiente con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el ambiente: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}


export default httpAmbiente