import Programa from '../models/programasFormacion.js'
//import DesarrolloCurricular from '../models/desarrollo.js'
import Material from "../models/materialesFor.js"
import Ambiente from "../models/ambientesFormacion.js"
import { v2 as cloudinary } from "cloudinary";

const httpprogramas = {

    getProgramas: async (req, res) => {
        console.log("get");
        const programas = await Programa.find()
            .populate("RedConocimiento")
            .populate("nivelFormacion")
            .populate({
                path: "desarrolloCurricular",
                populate: {
                    path: "idGuias",
                    model: "Guia" // Reemplaza con el nombre real del modelo de la guía
                }
            })
            .populate("instructores")
            .populate("ambienteFormacion")
            .populate("materialesformacion")

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
            instructores, ambienteFormacion, materialesformacion } = req.body;
        console.log(codigo, denominacionPrograma, nivelFormacion, version, estado, RedConocimiento, desarrolloCurricular, instructores, ambienteFormacion, materialesformacion);
        console.log("------------------")
        const { disCurricular } = req.files
        console.log({ disCurricular })
        try {
            if (!disCurricular || !disCurricular.tempFilePath) {
                return res.status(400), json({ msg: 'no hay archivo en la peticion' })
            }
            const extension = disCurricular.name.split(".").pop()
            const { tempFilePath } = disCurricular;
            console.log({ tempFilePath })
            cloudinary.uploader.upload(
                tempFilePath,
                { width: 250, crop: "limit", resource_type: "raw", format: extension },
                async function (error, result) {
                    if (result) {
                        const programa = new Programa({
                            codigo,
                            denominacionPrograma,
                            nivelFormacion,
                            version,
                            estado,
                            RedConocimiento,
                            disCurricular: result.url,
                            desarrolloCurricular,
                            instructores,
                            ambienteFormacion,
                            materialesformacion
                        });

                        const programaExistente = await Programa.findOne({ codigo });
                        if (programaExistente) {
                            return res.status(400).json({ msg: 'El programa ya está registrado.' });
                        }
                        else {
                            await programa.save();
                            res.status(200).json({ msg: "todo salio correcto:", programa, status: "ok" });
                        }
                    } else {
                        res.json(error)
                    }
                }
            )
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ msg: 'Hubo un error al agregar el programa de formacion.' });
        }
    },

    putDiseno: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { id } = req.params
        const { disCurricular } = req.files

        try {
            if (!disCurricular || !disCurricular.tempFilePath) {
                return res.status(400).json({ msg: "No hay archivo en la peticion" });
            }

            const extension = disCurricular.name.split(".").pop();
            const { tempFilePath } = disCurricular;

            cloudinary.uploader.upload(tempFilePath, { width: 250, crop: "limit", resource_type: "raw", format: extension },
                async function (error, result) {
                    if (result) {
                        let holder = await Programa.findById(id);

                        if (holder && holder.disCurricular) {
                            const nombreTemp = holder.disCurricular.split("/");
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1];
                            const [public_id] = nombreArchivo.split(".");
                            cloudinary.uploader.destroy(public_id);
                        }

                        let prueba = await Programa.findByIdAndUpdate(id, {
                            disCurricular: result.url
                        });
                        
                        prueba.save()
                        res.status(200).json({ msj: "Edición exitosa", status: "ok", prueba });
                    } else {
                        res.json(error);
                    }
                })

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error en el servidor" });
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
                .populate({
                    path: "desarrolloCurricular",
                    populate: {
                        path: "idGuias",
                        model: "Guia" // Reemplaza con el nombre real del modelo de la guía
                    }
                })                
                .populate("instructores")
                .populate("ambienteFormacion")
                .populate("materialesformacion")
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
        const programaId = req.params.id;  // ID del programa al que se le asignará el material
        const { materialesformacion } = req.body;  // ID del material de formación que se asignará

        try {

            // Verificar si el programa existe
            const programa = await Programa.findById(programaId);
            if (!programa) {
                return res.status(404).json({ msg: 'Programa no encontrado' });
            }

            // Verificar si el material de formación existe
            const material = await Material.findById(materialesformacion);
            if (!material) {
                return res.status(404).json({ msg: 'Material de formación no encontrado' });
            }

            // Verificar si el material ya está asignado al programa
            if (programa.materialesformacion.includes(materialesformacion)) {
                return res.status(400).json({ msg: 'El material ya está asignado al programa' });
            }

            // Asignar el material de formación al programa
            programa.materialesformacion.push(materialesformacion);
            await programa.save();

            res.status(200).json({ msg: 'Material de formación asignado exitosamente al programa', programa });
        } catch (error) {
            console.error('Error al asignar material de formación al programa:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        }
    },

    asignarAmbientes: async (req, res) => {
        const programaId = req.params.id;  // ID del programa al que se le asignará el material
        const { ambienteFormacion } = req.body;  // ID del ambiente que se asignará

        try {

            // Verificar si el programa existe
            const programa = await Programa.findById(programaId);
            if (!programa) {
                return res.status(404).json({ msg: 'Programa no encontrado' });
            }

            // Verificar si el ambiente de formación existe
            const ambiente = await Ambiente.findById(ambienteFormacion);
            if (!ambiente) {
                return res.status(404).json({ msg: 'Ambiente de formación no encontrado' });
            }

            // Verificar si el material ya está asignado al programa
            if (programa.ambienteFormacion.includes(ambienteFormacion)) {
                return res.status(400).json({ msg: 'El ambiente ya está asignado al programa' });
            }

            // Asignar el material de formación al programa
            programa.ambienteFormacion.push(ambienteFormacion);
            await programa.save();

            res.status(200).json({ msg: 'Ambiente asignado exitosamente al programa', programa });
        } catch (error) {
            console.error('Error al asignar material de formación al programa:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        }
    },

    getMaterialesPrograma: async (req, res) => {
        const programaId = req.params.id;

        try {
            // Buscar el programa por ID
            const programa = await Programa.findById(programaId).populate("materialesformacion");

            if (!programa) {
                return res.status(404).json({ msg: 'Programa no encontrado' });
            }

            // Devolver los materiales asociados al programa
            const materiales = programa.materialesformacion;

            res.status(200).json({ materiales });
        } catch (error) {
            console.error('Error al obtener materiales del programa:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        }
    },

    postProgramaInstructor: async (req, res) => {

        try {
            const { id } = req.params;
            const { instructores } = req.body;
            const buscar = await Programa.findById(id);
            console.log(buscar);
            if (buscar.instructores && buscar.instructores.includes(instructores)) {
                return res.status(404).json({ msg: 'El Instructor ya se encuentra ligado al programa' })
            };
            const instructorAgregado = await Programa.updateOne(
                { _id: id },
                { $addToSet: { instructores: instructores } }
            );
            if (instructorAgregado.modifiedCount !== 0) {
                return res.json({ instructorAgregado })
            }
        } catch (error) {
            console.log(error);
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
                res.status(404).json({ msg: `programa con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el programa: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpprogramas