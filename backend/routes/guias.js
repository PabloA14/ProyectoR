import httpGuias from "../controllers/guias.js";
import { Router } from "express";
const routes =Router()

routes.post("/", httpGuias.postGuia )
routes.get("/" , httpGuias.getGuias)
routes.get("/:Codigo" , httpGuias.getCodigoGuia)
routes.put("/:codigo", httpGuias.putGuias)


export default routes