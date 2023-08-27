import Ciudad from "../models/ciudades.js";

const httpredes = {

    postCiudades: async (req, res) => {
        const { codigoCiudad, nombre, region, departamento, codDepartamento } = req.body;

        try {
            const ciudades = new Ciudad({
                codigoCiudad, nombre, region, departamento, codDepartamento
            });

            const cod = await Ciudad.findOne({ codigoCiudad: codigoCiudad });
            console.log(cod);
            if (cod) {
                return res.status(400).json({ msg: 'La cuidad ya se encuentra registrada', cod, nombre });
            } else {
                await ciudades.save()
                return res.status(200).json({ msg: 'El registro de la ciudad ha sido exitoso', ciudades });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor , agregar ciudades' });
        }
    },

    getCiudades: async (req, res) => {
        const ciudades = await Ciudad.find()
        res.status(200).json({ ciudades })
    },

    getCodigo: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Ciudad.find({ codigoCiudad: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo de la ciudad ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putCiudades: async (req, res) => {
        const Codigo = req.params.codigo;

        try {
            const updatedCiudad = await Ciudad.findOneAndUpdate(
                { codigoCiudad: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        region: req.body.region,
                        departamento: req.body.departamento,
                    }
                },
                { new: true }
            );

            if (!updatedCiudad) {
                return res.status(404).json({ msg: 'Red no encontrado' });
            }
            res.status(200).json({ msg: 'Ciudad actualizada exitosamente', red: updatedCiudad });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  ciudades' });
        }
    }

}

export default httpredes