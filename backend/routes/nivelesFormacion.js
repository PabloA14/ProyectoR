import httpNivelFormacion from "../controllers/nivelesFormacion.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post("/", [
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpNivelFormacion.postnivelFormacion)

router.get("/", httpNivelFormacion.getNivelesFormacion)

router.put("/:id", [
    check("denominacion", "La denominación es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpNivelFormacion.putnivelFormacion)

router.patch("/:id", httpNivelFormacion.patchNiveles)


export default router