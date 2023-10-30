import { Long } from "mongodb"
import Programa from '../models/programasFormacion.js'

import DesarrolloC from "../models/desarrollo.js"
import { v2 as cloudinary } from "cloudinary";


const httpDesarrolloC = {


    postDesarrollo: async (req, res) => {
        console.log("postDesarrollo desarrollo C")
        const { codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias } = req.body
        console.log('estes es el codigo')
        console.log(codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias)

        try {
            const desarrolloCurricular = new DesarrolloC({
                codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias
            })

            await desarrolloCurricular.save()
            console.log(desarrolloCurricular)
            return res.status(200).json({ msg: 'El registro de la Desarrollo ha sido exitoso tienes un status 200', desarrolloCurricular, status: "ok" });

        } catch (error) {
            return res.status(500).json({ msj: "ha ocurrido un error en el servidor al momnento de inserat" })
        }
    },

    getDesarrollosTodo: async (req, res) => {
        const desarrollo = await DesarrolloC.find().populate("idGuias")
        res.status(200).json({ desarrollo })
    },

    getCodigo: async (req, res) => {
        const Codigo = req.params.Codigo
        try {
            const cod = await DesarrolloC.find({ codigo: Codigo })
            console.log(cod);
            if (cod.length === 0) {
                res.status(400).json({ sms: `sin coincidencias para el codigo del desarrollo Curricular ${Codigo}` })
            } else {
                res.status(200).json({ cod })
            }
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    putDesarrollo: async (req, res) => {
        const desarrolloId = req.params.id;
        const { codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias } = req.body;

        try {
            const updatedFields = {
                codigo, matrizcorrelacion, proyectoFormativo, planeacionPedagogica, idGuias
            };

            const updatedDesarrollo = await DesarrolloC.findOneAndUpdate(
                { _id: desarrolloId },
                {
                    $set: updatedFields
                },
                { new: true }
            );

            res.status(200).json({ msg: 'actualizado exitosamente', desarrollo: updatedDesarrollo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar' });
        }
    },

    /*     putMatrizC : async (req, res) => {
            console.log("put matriz correlacion del desarrollo curricular")
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_NAME,
                    api_key: process.env.CLOUDINARY_KEY,
                    api_secret: process.env.CLOUDINARY_SECRET,
                    secure: true,
                });
    
            const {id} = req.params
            console.log({id})
            const {matrizcorrelacion} =req.files
            console.log({matrizcorrelacion})
    
            try {
                if (!matrizcorrelacion || !matrizcorrelacion.tempFilePath) {
                    return res.status(400).json({ msg: "No hay archivos en la peticion" });
                }
                const extension = matrizcorrelacion.name.split(".").pop();
    
                const { tempFilePath } = matrizcorrelacion;
                console.log(tempFilePath);
    
                cloudinary.uploader.upload(
                    tempFilePath,
                    { width: 250, crop: "limit", resource_type: "raw", format: extension },
                    async function (error, result) {
                        if (result) {
                            let holder = await DesarrolloC.findById(id);
                            console.log(holder   + "holder")
    
                            if (holder && holder.matrizcorrelacion) {
                                const nombreTemp = holder.matrizcorrelacion.split("/");
                                const nombreArchivo = nombreTemp[nombreTemp.length - 1]; 
                                const [public_id] = nombreArchivo.split(".");
                                cloudinary.uploader.destroy(public_id);
                            }
                            holder = await DesarrolloC.findByIdAndUpdate(id, {
                                matrizcorrelacion: result.url
                            });
                            holder.save()
                            res.status(200).json({  msj : "todo salio correcto" , status: "ok", holder ,  });
                        } else {
                            res.json(error);
                        }
                    }
                );
    
                
            } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "Error en el servidor" });
            }
        } */


    putMatrizC: async (req, res) => {
        console.log("put matriz correlacion del desarrollo curricular")
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true,
        });

        const { id } = req.params
        console.log({ id })
        const { matrizcorrelacion } = req.files
        console.log({ matrizcorrelacion })

        try {
            if (!matrizcorrelacion || !matrizcorrelacion.tempFilePath) {
                return res.status(400).json({ msg: "No hay archivos en la peticion" });
            }
            const extension = matrizcorrelacion.name.split(".").pop();

            const { tempFilePath } = matrizcorrelacion;
            console.log(tempFilePath);

            cloudinary.uploader.upload(tempFilePath, { width: 250, crop: "limit", resource_type: "raw", format: extension }, 
            async function (error, result) {
                if (result) {
                    let holder = await DesarrolloC.findById(id);
                    console.log(holder   + "holder")

                    if (holder && holder.matrizcorrelacion) {
                        const nombreTemp = holder.matrizcorrelacion.split("/");
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1]; 
                        const [public_id] = nombreArchivo.split(".");
                        cloudinary.uploader.destroy(public_id);
                    }
                    let prueba = await DesarrolloC.findByIdAndUpdate(id, {
                        matrizcorrelacion: result.url
                    });
                    prueba.save()
                    res.status(200).json({  msj : "todo salio correcto" , status: "ok", prueba ,  });
                } else {
                    res.json(error);
                }
            })



        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error en el servidor" });
        }
    }
}

export default httpDesarrolloC