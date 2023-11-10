import httpInstrumentos from "../controllers/instrumentos.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpInstrumentos.postInstrumentos)

routes.get("/", httpInstrumentos.getInstrumentos)
routes.get("/:codigo", httpInstrumentos.getInstrumentoCodigo)

routes.put("/:id", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpInstrumentos.putInstrumentosE)


export default routes