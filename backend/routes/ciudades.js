import httpCiudades from "../controllers/ciudades.js";
import { Router } from "express";

const router = Router()

router.post("/", httpCiudades.postCiudades)
router.get("/", httpCiudades.getCiudades)
router.get("/:Codigo", httpCiudades.getCodigo)
router.put("/:codigo", httpCiudades.putCiudades)

export default router