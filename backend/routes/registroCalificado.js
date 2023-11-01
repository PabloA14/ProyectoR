import httpregistro from "../controllers/registroCalificado.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";
const router = Router()

router.post("/", [
    check("titulo", "El título es obligatorio").trim().not().isEmpty(),
    check("lugardesarrollo", "El lugar de desarrollo es obligatorio").trim().not().isEmpty(),
    check("metodologia", "La metodología es obligatoria").trim().not().isEmpty(),
    check("creditos", "Los créditos son obligatorios").trim().not().isEmpty(),
    check("codigosnies", "El código SNIES es obligatorio").trim().not().isEmpty(),
    check("fecha", "La fecha es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpregistro.postregistro)

router.get("/", httpregistro.getRegistrosCalifidos)
router.get("/:codigosnies", httpregistro.getcodigo)
router.put("/:id",
    [
        check("titulo", "El título es obligatorio").trim().not().isEmpty(),
        check("lugardesarrollo", "El lugar de desarrollo es obligatorio").trim().not().isEmpty(),
        check("metodologia", "La metodología es obligatoria").trim().not().isEmpty(),
        check("creditos", "Los créditos son obligatorios").trim().not().isEmpty(),
        check("codigosnies", "El código SNIES es obligatorio").trim().not().isEmpty(),
        check("fecha", "La fecha es obligatoria").trim().not().isEmpty(),
        validarCampos
    ], httpregistro.putRegistro)


export default router