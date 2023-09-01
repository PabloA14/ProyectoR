import httpInvestigaciones from "../controllers/investigaciones.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpInvestigaciones.postinveestigacion)
routes.get("/", httpInvestigaciones.getinvestigaciones)
routes.get("/:codigo", httpInvestigaciones.getCodigo)
routes.put("/:codigo", httpInvestigaciones.putninvestigacion)

export default routes