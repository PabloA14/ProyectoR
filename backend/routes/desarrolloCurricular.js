import httpDesarrollo from "../controllers/desarrollo.js";
import { Router } from "express";
const routes =Router()

routes.post("/", httpDesarrollo.postDesarrollo )
routes.get("/" , httpDesarrollo.getDesarrollosTodo)
routes.get("/:Codigo" , httpDesarrollo.getCodigo)
routes.put("/:codigo", httpDesarrollo.putDesarrollo)


export default routes