import httpprogramas from "../controllers/programasFormacion.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

const router = Router()

router.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacionPrograma", "La denominación es obligatoria").trim().not().isEmpty(),
    check("nivelFormacion", "El nivel de formación es obligatorio").not().isEmpty(),
    check("version", "La version es obligatoria").trim().not().isEmpty(),

    check("disCurricular", "el diseño curricular es obligatorio ").isString(),

    validarCampos
], httpprogramas.postPrograma)

router.post("/agregar/instructor/:id",httpprogramas.postProgramaInstructor)

//router.get("/traer", httpprogramas.getProgramaCod)
router.get("/traer/:codigo", httpprogramas.getProgramaCod)

router.get("/materiales/:id", httpprogramas.getMaterialesPrograma)
router.get("/", httpprogramas.getProgramas)

router.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacionPrograma", "La denominación es obligatoria").trim().not().isEmpty(),
    check("nivelFormacion", "El nivel de formación es obligatorio").not().isEmpty(),
    check("version", "La version es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpprogramas.putProgramas)


router.put("/editarDesarrollo/:id" , httpprogramas.putDesarrollo)

router.patch("/:id", httpprogramas.patchPrograma)

router.post("/asignarMateriales/:id", httpprogramas.asignarMateriales)
router.post("/asignarAmbientes/:id", httpprogramas.asignarAmbientes)
router.post("/postDisCurricular/:id", httpprogramas.postDiseno)

export default router