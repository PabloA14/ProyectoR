import httpNivelFormacion from "../controllers/nivelesFormacion.js";
import { Router } from "express";

const router = Router()

router.post("/", httpNivelFormacion.postnivelFormacion)
router.get("/", httpNivelFormacion.getNivelesFormacion)
router.get("/:codigo", httpNivelFormacion.getCodigonivel)
router.put("/:id", httpNivelFormacion.putPasajero)

export default router