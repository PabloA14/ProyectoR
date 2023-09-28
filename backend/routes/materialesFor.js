import httpMateriales from "../controllers/materialesFor.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

const routes = Router()

routes.get("/", httpMateriales.getMaterial)
routes.get("/:codigo", httpMateriales.getCodigoMaterial)

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpMateriales.postMaterial)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpMateriales.putMaterial)

routes.patch("/:id", httpMateriales.patchMaterial)

routes.post('/upload/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpMateriales.cargarArchivo)

routes.get('/upload/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpMateriales.mostrarArchivo)

routes.post('/uploadcloud/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpMateriales.cargarArchivoCloud)

routes.get("/uploadcloud/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpMateriales.mostrarArchivoCloud)

export default routes