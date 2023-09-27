import httpProyectos from "../controllers/proye.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpProyectos.postProyecto)
routes.get("/", httpProyectos.getProyecto)
routes.get("/:Codigo", httpProyectos.getCodigoProyecto)
routes.put("/:codigo", httpProyectos.putProyecto)


export default routes