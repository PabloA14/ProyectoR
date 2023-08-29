import iniciarSesion from "../controllers/login.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post("/", [
    check("cedula", "Ingrese la cédula").trim().not().isEmpty(),
    check("clave", "Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
], iniciarSesion.loginUsuario)

export default router