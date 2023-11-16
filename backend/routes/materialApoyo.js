import httpMatAp from "../controllers/materialApoyo.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("enlace", "Proporcione un enlace/URL válido").trim().optional({ values: 'falsy' }).isURL(),
    validarCampos
], httpMatAp.postMaterialApoyo)

routes.get("/", httpMatAp.getMaterialApoyo)

routes.put("/:id", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("enlace", "Proporcione un enlace/URL válido").trim().optional({ values: 'falsy' }).isURL(),
    validarCampos
], httpMatAp.putMaterialApoyo)

export default routes