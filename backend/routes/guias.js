import httpGuias from "../controllers/guias.js";
import { Router } from "express";
const routes = Router()

routes.post("/", httpGuias.postGuia)
routes.get("/", httpGuias.getGuias)
routes.get("/:id", httpGuias.getGuiaPorId)
routes.put("/:id", httpGuias.putGuias)

export default routes