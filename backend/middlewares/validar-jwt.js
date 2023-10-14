import jwt from "jsonwebtoken"
import Usuario from "../models/usuarios.js";

// const generarJWT = (uid) => {
//     return new Promise((resolve, reject) => {
//         const payload = { uid };
//         jwt.sign(payload, process.env.CLAVE_SECRETA, {
//             expiresIn: "4h"//4h
//         }, (err, token) => {
//             if (err) {
//                 console.log(err);
//                 reject("No se pudo generar el token")
//             } else {
//                 resolve(token)
//             }
//         })
//     })
// }

// const validarJWT = async (req, res, next) => {
//     const token = req.header("x-token");
//     if (!token) {
//         return res.status(401).json({
//             msg: "No hay token en la peticion"
//         })
//     }

//     try {
//         const { uid } = jwt.verify(token, process.env.CLAVE_SECRETA)

//         let usuario = await Usuario.findById(uid);

//         if (!usuario) {
//             return res.status(401).json({
//                 msg: "Token no válido "//- usuario no existe DB
//             })
//         }
//         if (usuario.estado == 0) {
//             return res.status(401).json({
//                 msg: "Token no válido " //- usuario con estado: false
//             })
//         }
//         req.holder=usuario
//         next();

//     } catch (error) {
//         res.status(401).json({
//             msg: "Token no valido"
//         })
//     }
// }

const generarJWT = (uid, rol,redConocimiento) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, rol,redConocimiento };  // Incluye el id y el rol en la carga útil
        jwt.sign(payload, process.env.CLAVE_SECRETA, {
            expiresIn: "4h" // 4 horas de expiración (ajusta según tus necesidades)
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
};


const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({ msg: "No hay token en la petición" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.CLAVE_SECRETA);
        const uid = decodedToken.uid;
        const rol = decodedToken.rol;
        const redConocimiento = decodedToken.redConocimiento

        let usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({ msg: "Token no válido" });
        }
        if (usuario.estado === 0) {
            return res.status(401).json({ msg: "Token no válido" });
        }
        req.holder = { usuario, rol,redConocimiento };
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token no válido" });
    }
};



export { generarJWT, validarJWT }