import Prueba from "../models/pruebas.js"

const httpPrueba = {

    postPrueba: async (req, res) => {
        const { cedula } = req.body;

        try {
            const pasajero = new Prueba({ cedula });
            await pasajero.save();
            res.json({ pasajero });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el cliente.' });
        }
    },
}

export default httpPrueba