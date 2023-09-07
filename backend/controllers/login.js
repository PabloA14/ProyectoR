import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const iniciarSesion = {
    loginUsuario: async (req, res) => {
        const { cedula, clave } = req.body;
        try {
            const user = await Usuario.findOne({ cedula: cedula });

            if (!user) {
                return res.status(401).json({ msg: 'Credenciales ' });
            }

            const passwordMatch = await bcrypt.compare(clave, user.clave);

            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Credenciales ' });
            }
            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.CLAVE_SECRETA, { expiresIn: '1h' });

            res.status(200).json({ msg: 'Inicio de sesión exitoso', token, user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }
};

export default iniciarSesion;
