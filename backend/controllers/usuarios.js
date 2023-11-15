import Usuario from "../models/usuarios.js";
import { generarJWT } from "../middlewares/validar-jwt.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";

const httpUsuario = {

  posUsuario: async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const {
      foto,
      cedula,
      nombre,
      apellidos,
      telefono,
      correo,
      clave,
      redConocimiento,
      rol,
      perfilProfesional,
    } = req.body;

    try {
      let hojaDeVidaUrl = null;

      // Verificar si se proporciona la hoja de vida
      if (req.files && req.files.hojaDeVida) {
        const { hojaDeVida } = req.files;
        if (!hojaDeVida.tempFilePath) {
          return res.status(400).json({ msg: "No hay archivos en la petición" });
        }

        const extension = hojaDeVida.name.split(".").pop();

        const { tempFilePath } = hojaDeVida;
        console.log(tempFilePath);

        // Subir la hoja de vida a Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
          width: 250,
          crop: "limit",
          resource_type: "raw",
          format: extension,
        });

        hojaDeVidaUrl = result.url;
      }

      const hashedPassword = await bcrypt.hash(clave, 10); // Hash the password
      const usuario = new Usuario({
        foto,
        cedula,
        nombre,
        apellidos,
        telefono,
        correo,
        clave: hashedPassword,
        redConocimiento,
        hojaDeVida: hojaDeVidaUrl, // Usar la URL de Cloudinary si está disponible
        rol,
        perfilProfesional,
      });

      const buscar = await Usuario.findOne({ cedula: cedula });
      if (buscar) {
        return res
          .status(400)
          .json({ msg: "La cédula ya se encuentra registrada", buscar });
      } else {
        await usuario.save();
        console.log(usuario);
        console.log(usuario.foto);

        res.status(200).json({ msg: "Registro exitoso", usuario });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  },

  loginUsuario: async (req, res) => {
    const { cedula, clave } = req.body;
    try {
      const user = await Usuario.findOne({ cedula: cedula })
        .populate("rol")
        .populate("redConocimiento")

      if (!user) {
        return res.status(401).json({ msg: "Credenciales inválidas" });
      }

      if (user.estado === 0) {
        return res.status(400).json({
          msg: "Usuario Inactivo",
        });
      }

      const passwordMatch = await bcrypt.compare(clave, user.clave);

      if (!passwordMatch) {
        return res.status(401).json({ msg: "Credenciales inválidas" });
      }

      // const token = await generarJWT(user.id);
      const token = await generarJWT(user.id, user.rol, user.redConocimiento);

      res.status(200).json({ msg: "Inicio de sesión exitoso", token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  },

  getUsusarios: async (req, res) => {
    const usuarios = await Usuario.find()
      .populate("rol")
      .populate("redConocimiento");
    res.status(200).json({ usuarios });
  },

  getUsuarioCodigo: async (req, res) => {
    const Codigo = req.params.codigo;
    console.log(Codigo);
    try {
      const cod = await Usuario.find({ cedula: Codigo });
      console.log(cod);
      if (cod.length === 0) {
        res.status(400).json({
          sms: `sin coincidencias para el usuario con la cedula  ${Codigo}`,
        });
      } else {
        res.status(200).json({ cod });
      }
    } catch (error) {
      res.json({ error });
      console.log(error);
    }
  },

  putUsuario: async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true
    });

    const usuarioId = req.params.id;
    const {
      cedula,
      nombre,
      apellidos,
      telefono,
      correo,
      redConocimiento,
      hojaDeVida,
      rol,
      perfilProfesional,
    } = req.body;

    try {
      const existingUser = await Usuario.findOne({ cedula: cedula });
      if (existingUser && existingUser._id.toString() !== usuarioId) {
        return res
          .status(400)
          .json({ msg: "La cédula ya está registrada para otro usuario" });
      }

      let hojaDeVidaUrl = null;

      // Verificar si se proporciona la hoja de vida
      if (req.files && req.files.hojaDeVida) {
        const { hojaDeVida } = req.files;
        if (!hojaDeVida.tempFilePath) {
          return res.status(400).json({ msg: "No hay archivos en la petición" });
        }

        const extension = hojaDeVida.name.split(".").pop();

        const { tempFilePath } = hojaDeVida;

        // Subir la hoja de vida a Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
          width: 250,
          crop: "limit",
          resource_type: "raw",
          format: extension,
        });

        const buscar = await Usuario.findById(usuarioId);
        if (buscar.hojaDeVida) {
          const nombreTemp = buscar.hojaDeVida.split("/");
          const nombrehojaDeVida = nombreTemp[nombreTemp.length - 1];
          const [public_id] = nombrehojaDeVida.split(".");
          await cloudinary.uploader.destroy(public_id);
        }

        hojaDeVidaUrl = result.url;
      }

      const updatedFields = {
        cedula,
        nombre,
        apellidos,
        telefono,
        correo,
        redConocimiento,
        hojaDeVida: hojaDeVidaUrl || hojaDeVida, // Usar la URL de Cloudinary si está disponible, de lo contrario, usar el valor proporcionado en el body
        rol,
        perfilProfesional,
      };

      const updatedUsuario = await Usuario.findOneAndUpdate(
        { _id: usuarioId },
        {
          $set: updatedFields,
        },
        { new: true }
      );

      res.status(200).json({
        msg: "Usuario actualizado exitosamente",
        usuario: updatedUsuario,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  },

  patchUsuario: async (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        usuario.estado = estado;
        await usuario.save();
        res.json(usuario);
      } else {
        res
          .status(404)
          .json({ mensaje: `usuario con id: ${id} no encontrado` });
      }
    } catch (error) {
      console.log(`Error al actualizar el usuario: ${error}`);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  mostrarImagenCloud: async (req, res) => {
    const { id } = req.params

    try {
      let holder = await Usuario.findById(id)
      if (holder.photo) {
        return res.json({ url: holder.foto })
      }
      res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  /* cargarArchivoCloudHoja: async (req, res, next) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const { id } = req.params;
    try {
      //subir archivo
      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.hojaDeVida
      ) {
        return res.status(400).json({ msg: "No hay archivos en la peticion" });
      }
      next();

      const { tempFilePath } = req.files.hojaDeVida;
      cloudinary.uploader.upload(
        tempFilePath,
        { width: 250, crop: "limit" },
        async function (error, result) {
          if (result) {
            let holder = await Usuario.findById(id);

            if (holder.hojaDeVida) {
              const nombreTemp = holder.hojaDeVida.split("/");
              const nombreArchivo = nombreTemp[nombreTemp.length - 1]; // hgbkoyinhx9ahaqmpcwl jpg
              const [public_id] = nombreArchivo.split(".");
              cloudinary.uploader.destroy(public_id);
            }
            holder = await Usuario.findByIdAndUpdate(id, {
              hojaDeVida: result.url,
            });
            //responder
            res.json({ url: result.url });
          } else {
            res.json(error);
          }
        }
      );
    } catch (error) {
      res.status(400).json({ error, general: "Controlador" });
    }
  }, */
  putFoto: async (req, res) => {
    console.log("put foto del Usuario")
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const { id } = req.params
    console.log({ id })
    const { foto } = req.files
    console.log({ foto })

    try {
      if (!foto || !foto.tempFilePath) {
        return res.status(400).json({ msg: "No hay foto en la peticion" });
      }
      const { tempFilePath } = foto;
      console.log(tempFilePath);

      cloudinary.uploader.upload(tempFilePath, { width: 250, crop: "limit", resource_type: "image" },
        async function (error, result) {
          if (result) {
            let holder = await Usuario.findById(id);
            console.log('---------------------------');
            console.log(holder + "holder")
            console.log('***********************');
            if (holder && holder.foto) {
              const nombreTemp = holder.foto.split("/");
              const nombreArchivo = nombreTemp[nombreTemp.length - 1];
              const [public_id] = nombreArchivo.split(".");
              cloudinary.uploader.destroy(public_id);
            }
            console.log(result.url);
            let prueba = await Usuario.findByIdAndUpdate(id, { 
              $set: { foto: result.url }
            }, { new: true });

            res.status(200).json({ msj: "todo salio correcto", status: "ok", prueba });
            console.log(prueba);
          } else {
            res.json(error);
          }
        })



    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }
};

export default httpUsuario;