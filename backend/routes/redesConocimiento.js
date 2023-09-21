import httpredes from "../controllers/RedConocimiento.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpredes.postRedes)

router.get("/", httpredes.getRedes)
router.get("/:codigo", httpredes.getCodigo)

router.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpredes.putRedes)
router.patch("/:id", httpredes.patchRedes)



export default router