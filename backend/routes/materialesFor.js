import httpMateriales from "../controllers/materialesFor.js"
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

const routes = Router()

routes.get("/", httpMateriales.getMaterial)

routes.post("/", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpMateriales.postMaterial)

routes.put("/:id", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").trim().not().isEmpty(),
    check("tipo", "El tipo es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpMateriales.putMaterial)

routes.patch("/:id", httpMateriales.patchMaterial)

export default routes