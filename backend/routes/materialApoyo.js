import httpMatAp from "../controllers/materialApoyo.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    //check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    //check("enlace", "Proporcione un enlace/URL válido").trim().isURL(),
    validarCampos
], httpMatAp.postMaterialApoyo)

routes.get("/", httpMatAp.getMaterialApoyo)
routes.get("/:codigo", httpMatAp.getMaterialApCodigo)

routes.put("/:id", [
    //check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    //check("enlace", "Proporcione un enlace/URL válido").trim().isURL(),
    validarCampos
], httpMatAp.putMaterialApoyo)

export default routes