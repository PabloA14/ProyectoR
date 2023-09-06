import httpMaterial from "../controllers/materialesFor.js"
import { Router } from "express";
const routes = Router()

routes.post("/", httpMaterial.postMaterial)
routes.get("/", httpMaterial.getMaterial)
routes.get("/:Codigo", httpMaterial.getCodigoMaterial)
routes.put("/:id", httpMaterial.putMaterial)


export default routes