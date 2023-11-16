import httpInvestigaciones from "../controllers/investigaciones.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatorio").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("documentos").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('El archivo es obligatorio');
        }
        return true;
    }),
    validarCampos
], httpInvestigaciones.postInvestigacion)

routes.get("/", httpInvestigaciones.getinvestigaciones)
routes.get("/:codigo", httpInvestigaciones.getCodigo)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpInvestigaciones.putninvestigacion)

export default routes