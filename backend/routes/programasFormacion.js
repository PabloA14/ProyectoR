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
    check("disCurricular").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('El diseño curricular es obligatorio');
        }
        return true;
    }),
    validarCampos
], httpprogramas.postPrograma)

router.post("/agregar/instructor/:id", httpprogramas.postProgramaInstructor)

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

router.put("/editarDiseno/:id", [
    check("disCurricular").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Debe adjuntar el archivo');
        }
        return true;
    }),
    validarCampos
], httpprogramas.putDiseno)

router.put("/editarDesarrollo/:id", httpprogramas.putDesarrollo)

router.patch("/:id", httpprogramas.patchPrograma)

router.post("/asignarMateriales/:id", httpprogramas.asignarMateriales)
router.post("/asignarAmbientes/:id", httpprogramas.asignarAmbientes)

export default router