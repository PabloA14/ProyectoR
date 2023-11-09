import Proyectos from "../models/proyectos.js"
import Programa from "../models/programasFormacion.js"


const httpProyectos = {
    postProyecto: async (req, res) => {
        const { codigo, nombre, descripcion, fecha, version, documento, programa } = req.body;
        try {
            
            const proyecto = new Proyectos({
                codigo, nombre, descripcion, fecha, version, documento, programa});
            const cod = await Proyectos.findOne({ codigo: codigo })
            if (cod) {
                return res.status(400).json({ msg: "El proyecto ya se encuentra en el sistema con el codigo", cod, nombre });
            } else {
                await proyecto.save();
                return res.status(200).json({ msg: 'Proyecto ingresado satisfactoriamente', proyecto, status :"ok" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ha ocurrido un error en el servidor al momento de crear el proyecto" });
        }
    },

    getProyecto: async (req, res) => {
        const guia = await Proyectos.find()
            .populate("programa")
        res.status(200).json({ guia })
    },

    getCodigoProyecto: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await Proyectos.find({ codigo: Codigo })
                .populate("programa")
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para elProyecto con el codigo de   ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putProyecto: async (req, res) => {
        const Codigo = req.params.codigo;
        try {
            const updatedPRoyectos = await Proyectos.findOneAndUpdate(
                { codigo: Codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        version: req.body.version,
                        programa: req.body.programa
                    }
                },
                { new: true }
            );

            if (!updatedPRoyectos) {
                return res.status(404).json({ msg: 'Proyecto no encontradp' });
            }
            res.status(200).json({ msg: 'Programa actualizado exitosamente', red: updatedPRoyectos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar Programas' });
        }
    }


}

export default httpProyectos