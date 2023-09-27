import httpRetroalimentacion from "../controllers/retroalimentacionRed.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpRetroalimentacion.postRetroalimentacion)
routes.get("/", httpRetroalimentacion.getRetroalimentacion)
routes.get("/:Codigo", httpRetroalimentacion.getCodigoRetroalimentacion)
routes.put("/:id", httpRetroalimentacion.putRetroalimentacion)


export default routes