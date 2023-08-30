import NivelFormacion from "../models/nivelesFormacion.js";

const httpNivelFormacion = {

    postnivelFormacion: async (req, res) => {
        const { codigo, denominacion } = req.body;

        try {
            const nivelformacion = new NivelFormacion({ codigo, denominacion });
            await nivelformacion.save();
            res.json({ nivelformacion });
        } catch (error) {
            console.error('Error al agregar el nivel de formación:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el nivel de formacion' });
        }
    },

    getNivelesFormacion: async (req, res) => {
        const nivelFormacion = await NivelFormacion.find()
        res.json({ nivelFormacion })
    },

    getCodigonivel: async (req, res) => {
        try {
            const nivelBuscado = req.params.codigo;
            const nivelEncontrado = await NivelFormacion.findOne({ codigo: nivelBuscado });
            if (!nivelEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el nivel de formacion con el codigo proporcionado' });
            } else {
                res.json(nivelEncontrado);
            }

        } catch (error) {
            console.error('Error al buscar el nivel de formacion:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el nivel de formacion' });
        }
    },


    getCodigo: async (req, res) => {
        try {
            const ambienteBuscado = req.params.codigo;
            const ambienteEncontrado = await NivelFormacion.findOne({ codigo: ambienteBuscado });
            if (!ambienteEncontrado) {
                return res.status(404).json({ mensaje: 'No se encontró el ambiente con el codigo proporcionado' });
            }
            res.json(ambienteEncontrado);
        } catch (error) {
            console.error('Error al buscar el ambiente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar el ambiente' });
        }
    },

    putnivelFormacion: async (req, res) => {
        const Codigo = req.params.codigo;

        try {
            const updateniveles = await NivelFormacion.findOneAndUpdate(
                //codigo unico / params
                { codigo: Codigo },
                {
                    $set: {
                        codigo: req.body.codigo,
                        denominacion: req.body.denominacion,
                        esado:  req.body.esado
                    }
                },
                { new: true }
            );

            if (!updateniveles) {
                return res.status(404).json({ msg: 'Red no encontrado' });
            }
            res.status(200).json({ msg: 'Ciudad actualizada exitosamente', red: updateniveles });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    }

}

export default httpNivelFormacion