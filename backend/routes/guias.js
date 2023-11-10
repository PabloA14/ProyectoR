import httpGuias from "../controllers/guias.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const routes = Router()

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpGuias.postGuia)

routes.get("/", httpGuias.getGuias)
routes.get("/:id", httpGuias.getGuiaPorId)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpGuias.putGuias)

export default routes