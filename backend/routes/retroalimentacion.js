import httpRetroalimentacion from "../controllers/retroalimentacionRed.js";
import { Router } from "express";
const routes = Router()
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";

routes.post("/", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("codigoFicha", "El código de la ficha es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatorio").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    check("documentos").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('El archivo es obligatorio');
        }
        return true;
    }),
    validarCampos
], httpRetroalimentacion.postRetroalimentacion)

routes.get("/", httpRetroalimentacion.getRetroalimentacion)

routes.put("/:id", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("codigoFicha", "El código de la ficha es obligatorio").trim().not().isEmpty(),
    check("descripcion", "La descripción es obligatorio").trim().not().isEmpty(),
    check("fecha", "El año es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpRetroalimentacion.putRetroalimentacion)

export default routes