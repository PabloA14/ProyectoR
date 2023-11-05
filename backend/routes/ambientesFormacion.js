import httpAmbiente from "../controllers/ambientesFormacion.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";


const router = Router()

router.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("centroformacion", "El centro de formación es obligatorio").trim().not().isEmpty(),
    check("tipo", "El tipo de ambiente es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpAmbiente.postambiente)

router.get("/", httpAmbiente.getAmbientes)
router.get("/:codigo", httpAmbiente.getCodigo)

router.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("centroformacion", "El centro de formación es obligatorio").trim().not().isEmpty(),
    check("tipo", "El tipo de ambiente es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpAmbiente.putAmbiente)
router.patch("/:id", httpAmbiente.patchAmbientes)


export default router