import httpUsuario from "../controllers/usuarios.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";
//import { validarExistaArchivo } from "../middlewares/validar-exista-archivo.js";


const router = Router()

router.get("/", httpUsuario.getUsusarios)
router.get("/:codigo", httpUsuario.getUsuarioCodigo)

router.post("/", [
    check("cedula", "La cédula es obligatoria").trim().not().isEmpty(),
    check("cedula", "Cédula de máximo 10 dígitos").trim().isLength({ max: 10 }),
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
    check("cedula", "Cédula de máximo 10 dígitos").trim().isLength({ max: 10 }),
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

router.patch("/:id", httpUsuario.patchUsuario)

router.post("/login", [
    check("cedula", "Ingrese la cédula").trim().not().isEmpty(),
    check("clave", "Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
], httpUsuario.loginUsuario)

router.post('/uploadcloudFoto/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpUsuario.cargarArchivoCloudFoto)

router.post('/uploadcloudHoja/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpUsuario.cargarArchivoCloudHoja)

router.get('/uploadcloudFoto/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpUsuario.mostrarArchivoCloudFoto)

router.get('/uploadcloudHoja/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpUsuario.mostrarArchivoCloudHoja)

export default router

