import httpCentrosF from "../controllers/centrosFormacion.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpCentrosF.postCentro)
routes.get("/", httpCentrosF.getCentros)
routes.get("/:Codigo", httpCentrosF.getCodigoCentro)
routes.put("/:id", httpCentrosF.putCentros)


export default routes