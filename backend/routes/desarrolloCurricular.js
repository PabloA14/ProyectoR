import httpDesarrolloC from "../controllers/desarrollo.js";
import httpDesarrollo from "../controllers/desarrollo.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpDesarrollo.postDesarrollo)
routes.get("/", httpDesarrollo.getDesarrollosTodo)
routes.get("/:Codigo", httpDesarrollo.getCodigo)
routes.put("/:id", httpDesarrollo.putDesarrollo)
routes.put("/putMatriz/D/:id", httpDesarrolloC.putMatrizC)
routes.put("/proyectoFormativo/updated/D/:id", httpDesarrolloC.putProyecto)
routes.put("/planecion/updated/Pedagogica/D/:id", httpDesarrolloC.putplaneacionPedagogica)


export default routes