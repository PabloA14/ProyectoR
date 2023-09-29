import httpCentrosF from "../controllers/centrosFormacion.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

routes.get("/", httpCentrosF.getCentros)

routes.post("/", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("direccion", "La dirección es obligatoria").trim().not().isEmpty(),
    check("ciudad", "La ciudad es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpCentrosF.postCentro)

routes.get("/:Codigo", httpCentrosF.getCodigoCentro)

routes.put("/:id", [
    check("codigo", "El código es obligatorio").trim().not().isEmpty(),
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("direccion", "La dirección es obligatoria").trim().not().isEmpty(),
    check("ciudad", "La ciudad es obligatoria").trim().not().isEmpty(),
    validarCampos
], httpCentrosF.putCentros)

routes.patch("/:id", httpCentrosF.patchCentros)


export default routes