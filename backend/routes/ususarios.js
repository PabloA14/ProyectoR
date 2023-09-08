import httpUsuario from "../controllers/usuarios.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";


const router = Router()

router.post("/", httpUsuario.posUsuario)
router.get("/", httpUsuario.getUsusarios)
router.get("/:codigo", httpUsuario.getUsuarioCodigo)
router.put("/:id", httpUsuario.putUsuario)
router.patch("/:id",httpUsuario.patchUsuario)

router.post("/login", [
    check("cedula", "Ingrese la cédula").trim().not().isEmpty(),
    check("clave", "Ingrese la contraseña").trim().not().isEmpty(),
    validarCampos
], httpUsuario.loginUsuario)

export default router

