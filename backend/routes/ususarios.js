import httpUsuario from "../controllers/usuarios.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.get("/", httpUsuario.getUsusarios)
router.get("/:cedula", httpUsuario.getUsuarioCodigo)

router.post("/", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "La cédula debe tener máximo 10 dígitos").trim().isLength({ min: 8, max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico no es válido").trim().isEmail(),
    check("clave", "La contraseña es obligatoria").trim().not().isEmpty(),
    check("clave", "La contraseña debe tener al menos 8 caracteres").trim().isLength({ min: 8 }),
    check("redConocimiento", "La red de conocimiento es obligatoria").trim().not().isEmpty(),
    check("rol", "El rol de usuario es obligatorio").trim().not().isEmpty(),
    check("perfilProfesional", "El perfil profesional es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpUsuario.posUsuario)

router.put("/:id", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "La cédula debe tener máximo 10 dígitos").trim().isLength({ min: 8, max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico no es válido").trim().isEmail(),
    check("redConocimiento", "La red de conocimiento es obligatoria").trim().not().isEmpty(),
    check("rol", "El rol de usuario es obligatorio").trim().not().isEmpty(),
    check("perfilProfesional", "El perfil profesional es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpUsuario.putUsuario)

router.put("/datosPersonales/:id", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula de máximo 10 dígitos").trim().isLength({ max: 10 }),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").trim().not().isEmpty(),
    check("telefono", "El teléfono es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico es obligatorio").trim().not().isEmpty(),
    check("correo", "El correo electrónico no es válido").trim().isEmail(),
    check("perfilProfesional", "El perfil profesional es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpUsuario.putUsuario)


router.patch("/:id", httpUsuario.patchUsuario)

router.post("/login", [
    check("cedula", "Ingrese la cédula").trim().not().isEmpty(),
    check("clave", "Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
], httpUsuario.loginUsuario)

router.get("/uploadcloud/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpUsuario.mostrarImagenCloud)


router.put("/Usuario/:id",
[
    check("foto").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Adjunte la foto');
        }
        return true;
    }),
    validarCampos
], httpUsuario.putFoto);

router.put("/envio/email",[
    check("correo","Debe ingresar el correo").trim().not().isEmpty(),
    validarCampos
],httpUsuario.envioEmail);

router.put("/nueva/contrasena",httpUsuario.nuevaContrasena);

export default router

