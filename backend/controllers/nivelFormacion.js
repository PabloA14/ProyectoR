import NivelFormacion from "../models/nivelFormacion";

const httpnivelFormacion = {

    postPrograma: async (req, res) => {
        const { tipo, disCurricular } = req.body;
        
        try {
            const programa = new NivelFormacion({ tipo, disCurricular });
            await programa.save();
            res.json({ programa });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    }

}