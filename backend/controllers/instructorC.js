import Instructor from "../models/instructores.js";

const httpInstructor = {
    posInstructor: async (req, res) => {
        const { cedula, nombre, apellidos, telefono, clave, experiencia, fechaNacimiento, redConocimiento, hojaDeVida, estado } = req.body;

        try {
            const instructor = new Instructor({
                cedula,
                nombre,
                apellidos,
                telefono,
                clave,
                experiencia,
                fechaNacimiento,
                redConocimiento,
                hojaDeVida,
                estado
            });
            const buscar = await Instructor.findOne({ cedula: cedula });
            if (buscar) {
                return res.status(400).json({ msg: 'El Instructor ya se encuentra registrado' , buscar });
            } else {
                await instructor.save();
                res.status(200).json({ msg: 'Registro exitoso', instructor });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getInstructorcc : async (req,res) =>{
        const {cedula} =req.body
        try{
            const cc = await Instructor.find({cedula : cedula})
            if (cc.length ===0) {
                res.status(400).json({ sms :  `sin coincidencias para ${cc}`})
            }else{
                res.status(200).json({ cc })
            }
        }catch (error){
            res.json({error})
        }
    },
    getInstructores : async (req,res) =>{
            const instructores= await Instructor.find()
            res.status(200).json({instructores})
    }
};

export default httpInstructor;
