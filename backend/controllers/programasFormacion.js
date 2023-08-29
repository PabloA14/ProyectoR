import Programa from '../models/programasFormacion.js'


const httpprogramas = {

    postPrograma: async (req, res) => {
        const { codigo, denominacionPrograma, nivelFormacion, version } = req.body;

        try {
            const programaExistente = await Programa.findOne({ codigo });

            if (programaExistente) {
                return res.status(400).json({ mensaje: 'El codigo ya está registrado.' });
            }

            const programa = new Programa({ codigo, denominacionPrograma, nivelFormacion, version });
            await programa.save();
            res.json({ programa });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    },
    getProgramaCod: async (req, res) => {
        const { codigo } = req.body
        try {
            const cod = await Programa.find({ codigo: codigo })
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para ${codigo}` })
            } else {
                res.status(200).json({ cod })

            }
        } catch (error) {
            res.json({ error })
        }
    },
    getProgramas: async (req, res) => {
        const programas = await Programa.find()
        res.status(200).json({ programas })
    },
    putProgramas: async (req, res) => {
        const { codigo, denominacionPrograma, nivelFormacion, version } = req.body

        try {
            const updatedProgramas = await Programa.findOneAndUpdate(
                { codigo: codigo },
                {
                    $set: {
                        denominacionPrograma,
                        nivelFormacion,
                        version
                    }
                },
                { new: true }
            );

            if (!updatedProgramas) {
                return res.status(404).json({ msg: 'Programa no encontrado' });
            }
            res.status(200).json({ msg: 'Programa actualizado exitosamente', Programa: updatedProgramas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }
}

export default httpprogramas