import httpGuias from "../controllers/guias.js";
import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js";

const routes = Router()

routes.post("/", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    check("documento").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('El archivo es obligatorio');
        }
        return true;
    }),
    validarCampos
], httpGuias.postGuia)

routes.get("/", httpGuias.getGuias)
routes.get("/:id", httpGuias.getGuiaPorId)

routes.put("/:id", [
    check("nombre", "El nombre es obligatorio").trim().not().isEmpty(),
    validarCampos
], httpGuias.putGuias)

export default routes