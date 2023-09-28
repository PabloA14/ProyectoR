import httpInstrumentos from "../controllers/instrumentos.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpInstrumentos.postInstrumentos)
routes.get("/", httpInstrumentos.getInstrumentos)
routes.get("/:Codigo", httpInstrumentos.getInstrumentoCodigo)
routes.put("/:id", httpInstrumentos.putInstrumentosE)


export default routes