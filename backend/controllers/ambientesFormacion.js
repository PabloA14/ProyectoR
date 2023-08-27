import Ambiente from "../models/ambientesFormacion"

const httpAmbiente = {

    postambiente: async (req, res) => {
        const { tipo, nombre } = req.body;

        try {
            const ambiente = new Ambiente({ tipo, nombre });
            await ambiente.save();
            res.json({ ambiente });
        } catch (error) {
            console.error('Error al agregar el nivel de formación:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el nivel de formacion.' });
        }
    }

}


export default httpAmbiente