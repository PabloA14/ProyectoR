import httpProyectos from "../controllers/proye.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("version", "La versión es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpProyectos.postProyecto)

routes.get("/", httpProyectos.getProyecto)
routes.get("/:codigo", httpProyectos.getCodigoProyecto)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("version", "La versión es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpProyectos.putProyecto)

export default routes