import Programa from '../models/programasFormacion.js'

const httpprogramas = {
    // aca van las peticiones

    getPrograma: async (req, res) => {
        const programa = await Programa.find()
        res.json({ programa })
    },

    postPrograma: async (req, res) => {
        const { codigo, nombre, denominacionPrograma, duracion, observacion } = req.body;

        try {
            const programaExistente = await Programa.findOne({ codigo });

            if (programaExistente) {
                return res.status(400).json({ mensaje: 'El codigo ya está registrado.' });
            }

            const programa = new Programa({ codigo, nombre, denominacionPrograma, duracion, observacion });
            await programa.save();
            res.json({ programa });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    },

}

export default httpprogramas