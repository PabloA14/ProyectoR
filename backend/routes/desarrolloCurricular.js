import httpDesarrolloC from "../controllers/desarrollo.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
const routes = Router()

routes.post("/", httpDesarrolloC.postDesarrollo)
routes.post("/guias/:id", httpDesarrolloC.postDesarrolloGuia)
routes.get("/", httpDesarrolloC.getDesarrollosTodo)
routes.get("/:Codigo", httpDesarrolloC.getCodigo)
routes.put("/:id", httpDesarrolloC.putDesarrollo)

routes.put("/putMatriz/D/:id", [
    check("matrizcorrelacion").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Debe adjuntar el archivo');
        }
        return true;
    }),
    validarCampos
], httpDesarrolloC.putMatrizC)

routes.put("/proyectoFormativo/updated/D/:id", [
    check("proyectoFormativo").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Debe adjuntar el archivo');
        }
        return true;
    }),
    validarCampos
], httpDesarrolloC.putProyecto)

routes.put("/planecion/updated/Pedagogica/D/:id", [
    check("planeacionPedagogica").custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('Debe adjuntar el archivo');
        }
        return true;
    }),
    validarCampos
], httpDesarrolloC.putplaneacionPedagogica)

export default routes
