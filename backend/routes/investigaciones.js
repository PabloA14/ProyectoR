import httpInvestigaciones from "../controllers/investigaciones.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "El archivo es obligatorio").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("documentos", "El archivo es obligatorio").not().isEmpty(),
    validarCampos
], httpInvestigaciones.postinveestigacion)

routes.get("/", httpInvestigaciones.getinvestigaciones)
routes.get("/:codigo", httpInvestigaciones.getCodigo)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("denominacion", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("documentos", "El archivo es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpInvestigaciones.putninvestigacion)

routes.post('/upload/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpInvestigaciones.cargarArchivo)

routes.get('/upload/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpInvestigaciones.mostrarArchivo)

routes.post('/uploadcloud/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpInvestigaciones.cargarArchivoCloud)

routes.get("/uploadcloud/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpInvestigaciones.mostrarArchivoCloud)

export default routes