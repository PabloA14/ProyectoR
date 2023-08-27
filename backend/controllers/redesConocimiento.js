import RedesConocimiento from "../models/redesConocimiento.js"

const httpredesConocimiento = {

    postredes: async (req, res) => {
        const { codigo, disCurricular } = req.body;
        
        try {
            const redes = new RedesConocimiento({ codigo, disCurricular });
            await redes.save();
            res.json({ redes });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    }

}

export default httpredesConocimiento