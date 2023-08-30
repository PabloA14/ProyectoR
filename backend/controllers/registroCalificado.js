import Resgistro from "../models/registroCalificado.js";

const httpregistro ={

    postregistro: async (req, res) => {
        const { titulo, lugadesarrollo, metodologia, creditos, codigosnies, fecha, documento } = req.body;

        try {
            const registroC = new Resgistro({ titulo, lugadesarrollo, metodologia, creditos, codigosnies, fecha, documento });
            await registroC.save();
            res.json({ registroC });
        } catch (error) {
            console.error('Error al agregar el Registro calificado:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el el Registro calificado' });
        }
    },

}

export default httpregistro