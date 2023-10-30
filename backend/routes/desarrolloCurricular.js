import httpDesarrolloC from "../controllers/desarrollo.js";
import httpDesarrollo from "../controllers/desarrollo.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpDesarrollo.postDesarrollo)
routes.get("/", httpDesarrollo.getDesarrollosTodo)
routes.get("/:Codigo", httpDesarrollo.getCodigo)
routes.put("/:id", httpDesarrollo.putDesarrollo)
routes.put("/putMatriz/D/:id", httpDesarrolloC.putMatrizC)


export default routes