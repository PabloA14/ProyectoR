import Programa from '../models/programasFormacion.js'
import DesarrolloCurricular from '../models/desarrollo.js'

import { v2 as cloudinary } from "cloudinary";

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
        console.log("agregar programa")

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        })
        const { codigo, denominacionPrograma, nivelFormacion, version, estado,
            RedConocimiento, desarrolloCurricular,
            instructores, ambienteFormacion, materialesformacion, registrocalificado } = req.body;
        console.log(codigo, denominacionPrograma, nivelFormacion, version, estado, RedConocimiento, desarrolloCurricular, instructores, ambienteFormacion, materialesformacion, registrocalificado);
        console.log("------------------")
        const {disCurricular}=req.files
        console.log({disCurricular})
        try {
            if (!disCurricular || !disCurricular.tempFilePath) {
                return res.status(400),json({msj : 'no hay archivo en la peticion'})
            }
            const extension =disCurricular.name.split(".").pop()
            const {tempFilePath} =disCurricular;
            console.log({tempFilePath})
            cloudinary.uploader.upload(
                tempFilePath,
                {width: 250 , crop : "limit", resource_type: "raw", format : extension},
                async function (error, result) {
                    if (result) {
                        const programa = new Programa({
                             codigo,
                            denominacionPrograma, 
                            nivelFormacion, 
                            version, 
                            estado, 
                            RedConocimiento, 
                            disCurricular : result.url, 
                            desarrolloCurricular, 
                            instructores, 
                            ambienteFormacion, 
                            materialesformacion, 
                            registrocalificado 
                        });

                        const programaExistente = await Programa.findOne({ codigo });
                        if (programaExistente) {
                            return res.status(400).json({ msg: 'El programa ya está registrado.' });
                        }
                        else {
                            await programa.save();
                            res.status(200).json({ mensaje: "todo salio correcto:", programa, status: "ok" });
                        }
                    }else{
                        res.json(error)
                    }
                }
            )
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ mensaje: 'Hubo un error al agregar el programa de formacion.' });
        }
    },

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
                res.status(200).json(cod);
            }
        } catch (error) {
            res.json({ error });
        }
    },
    putProgramas: async (req, res) => {
        console.log('putProgramas')


        const ProgramaId = req.params.id;
        const { codigo, denominacionPrograma, nivelFormacion, version, desarrolloCurricular } = req.body

        try {

            const existingP = await Programa.findOne({ codigo: codigo });
            if (existingP && existingP._id.toString() !== ProgramaId) {
                return res.status(400).json({ msg: 'El programa ya está registrado' });
            }

            const updatedFields = {
                codigo,
                denominacionPrograma,
                nivelFormacion,
                version,
                desarrolloCurricular
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

    putDesarrollo: async (req, res) => {
        console.log('puDesarrollo programa Formación')
        const ProgramaId = req.params.id;
        const { desarrolloCurricular } = req.body

        try {
            const updatedFields = { desarrolloCurricular };
            const updatedProgramas = await Programa.findOneAndUpdate(
                { _id: ProgramaId },
                {
                    $set: updatedFields

                },
                { new: true }
            );
            if (!updatedProgramas) {
                return res.status(404).json({ msg: 'Desarrollo no encontrado' });
            }
            res.status(200).json({ msg: 'Desarrollo actualizado exitosamente', Programa: updatedProgramas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor', error });
        }
    },

    asignarMateriales: async (req, res) => {
        const programaId = req.params.id;
        const { materialesformacion } = req.body;

        try {
            const programa = await Programa.findById(programaId);

            if (!programa) {
                return res.status(404).json({ mensaje: 'Programa no encontrado' });
            }

            // Asignar materiales al programa
            programa.materialesformacion = materialesformacion;

            // Guardar el programa actualizado
            await programa.save();

            res.status(200).json({ mensaje: 'Materiales asignados correctamente', programa });
        } catch (error) {
            console.error('Error al asignar materiales:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    },

    postDiseno: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { id } = req.params;
        const { disCurricular } = req.files

        try {
            if (!disCurricular || !disCurricular.tempFilePath) {
                return res.status(400).json({ msg: "No hay archivos en la peticion" });
            }
            const extension = disCurricular.name.split(".").pop();

            const { tempFilePath } = disCurricular;
            console.log(tempFilePath);

            cloudinary.uploader.upload(
                tempFilePath,
                { width: 250, crop: "limit", resource_type: "raw", format: extension },
                async function (error, result) {
                    if (result) {
                        let holder = await Programa.findById(id);

                        if (holder.disCurricular) {
                            const nombreTemp = holder.disCurricular.split("/");
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1]; // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split(".");
                            cloudinary.uploader.destroy(public_id);
                        }
                        holder = await Programa.findByIdAndUpdate(id, {
                            disCurricular: result.url
                        });
                        //responder
                        res.json({ url: result.url });
                    } else {
                        res.json(error);
                    }
                }
            );


        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error en el servidor" });
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