import redesConocimiento from "../models/redesConocimiento.js";


const httpredes = {

    postRedes :async (req,res) =>{
        const {Codigo , Denominacion} =req.body
        try{
            const redes = new redesConocimiento({
                Codigo,
                Denominacion
            });
            const cod = await redesConocimiento.findOne({ Codigo: Codigo });
            console.log(cod);
            if (cod) {
                return res.status(400).json({ msg: 'La red de conocimiento ya se encuenta registrada' , cod });
            }else{
                await redes.save()
                return res.status(200).json({ msg: 'Registro exitoso' , redes });
            }
        }catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },
    getRedes : async (req,res) =>{
        const redes= await redesConocimiento.find()
        res.status(200).json({redes})
    },
    getCodigo : async (req,res) =>{
        const {Codigo} = req.params
        try{
            const cod = await redesConocimiento.find({Codigo : Codigo})
            if (cod.length ===0) {
                res.status(400).json({ sms :  `sin coincidencias para ${cod}`})
            }else{
                res.status(200).json({ cod })
            }
        }catch (error){
            res.json({error})
            console.log(error);
        }
    },

    putRedes : async (req,res) =>{
        const Codigo = req.params.codigo;

        try {
            const updatedRed = await redesConocimiento.findOneAndUpdate(
                { Codigo: Codigo }, 
                {
                    $set: {
                        Denominacion: req.body.Denominacion
                    }
                },
                { new: true } 
            );
            
            if (!updatedRed) {
                return res.status(404).json({ msg: 'Red no encontrado' });
            }
            res.status(200).json({ msg: 'Red de conocimiento actualizada exitosamente', red: updatedRed });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor Actualizar  Redes' });
        }
    }

}

export default httpredes