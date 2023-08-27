import NivelFormacion from "../models/nivelFormacion";

const httpnivelFormacion = {

    postnivelFormacion: async (req, res) => {
        const { tipo, nombre } = req.body;

        try {
            const nivelformacion = new NivelFormacion({ tipo, nombre });
            await nivelformacion.save();
            res.json({ nivelformacion });
        } catch (error) {
            console.error('Error al agregar el nivel de formación:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el nivel de formacion.' });
        }
    }

}

export default httpnivelFormacion