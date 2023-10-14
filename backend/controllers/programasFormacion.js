import Programa from '../models/programasFormacion.js'

const httpprogramas = {

    getProgramas: async (req, res) => {
        console.log("get");
        const programas = await Programa.find()
            .populate("RedConocimiento")
            .populate("nivelFormacion")
            .populate("desarrolloCurricular")
            .populate("instructores")
            .populate("ambienteFormacion")
            .populate("materialesformacion")
            .populate("registrocalificado")
        res.status(200).json({ programas })
    },
    

    postPrograma: async (req, res) => {
        const { codigo, denominacionPrograma, nivelFormacion, version, estado,
            RedConocimiento, disCurricular, desarrolloCurricular,
            instructores, ambienteFormacion, materialesformacion, registrocalificado } = req.body;

        console.log(codigo, denominacionPrograma, nivelFormacion, version, estado, RedConocimiento, disCurricular, desarrolloCurricular, instructores, ambienteFormacion, materialesformacion, registrocalificado);
        try {
            const programaExistente = await Programa.findOne({ codigo });

            if (programaExistente) {
                return res.status(400).json({ mensaje: 'El programa ya está registrado.' });
            }

            const programa = new Programa({ codigo, denominacionPrograma, nivelFormacion, version, estado, RedConocimiento, disCurricular, desarrolloCurricular, instructores, ambienteFormacion, materialesformacion, registrocalificado });
            await programa.save();
            res.json({ programa });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    },

    // getProgramaCod: async (req, res) => {
    //     console.log("getcod");
    //     // const { codigo } = req.body

    //     try {
    //         const cod = await Programa.find({ codigo: codigo })
    //         if (cod.length === 0) {
    //             res.status(400).json({ sms: `sin coincidencias para ${codigo}` })
    //         } else {
    //             res.status(200).json({ cod })

    //         }
    //     } catch (error) {
    //         res.json({ error })
    //     }
    // },

    getProgramaCod: async (req, res) => {
        console.log("getcod");
        const codigo = req.params.codigo;
        console.log({ codigo });
        try {
            const cod = await Programa
                .findOne({ codigo: codigo })
                .populate("RedConocimiento")
                .populate("nivelFormacion")
                .populate("desarrolloCurricular")
                .populate("instructores")
                .populate("ambienteFormacion")
                .populate("materialesformacion")
                .populate("registrocalificado");
    
            if (!cod) {
                res.status(400).json({ sms: `sin coincidencias para ${codigo}` });
            } else {
                console.log(cod);
                res.status(200).json( cod );
            }
        } catch (error) {
            res.json({ error });
        }
    },
    putProgramas: async (req, res) => {
        const ProgramaId = req.params.id;
        const { codigo, denominacionPrograma, nivelFormacion, version } = req.body

        try {

            const existingP = await Programa.findOne({ codigo: codigo });
            if (existingP && existingP._id.toString() !== ProgramaId) {
                return res.status(400).json({ msg: 'El programa ya está registrado' });
            }

            const updatedFields = {
                codigo,
                denominacionPrograma,
                nivelFormacion,
                version
            };
            const updatedProgramas = await Programa.findOneAndUpdate(
                { _id: ProgramaId },
                {
                    $set: updatedFields

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
    },

    patchPrograma: async (req, res) => {
        const id = req.params.id;
        const { estado } = req.body;
        try {
            const programa = await Programa.findById(id);
            if (programa) {
                programa.estado = estado;
                await programa.save();
                res.json(programa);
            } else {
                res.status(404).json({ mensaje: `programa con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el programa: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpprogramas