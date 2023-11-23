import httpRoles from "../controllers/rolesUsuario.js"
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()
router.get("/", httpRoles.getRoles)

//router.get("/:codigo", httpRoles.getCodigo)

router.post("/", [
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpRoles.postRoles)

router.put("/:id", [
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpRoles.putRoles)

router.patch("/:id", httpRoles.patchRoles)

export default router