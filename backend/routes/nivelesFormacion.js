import httpNivelFormacion from "../controllers/nivelesFormacion.js";
import { Router } from "express";

const router = Router()

router.post("/", httpNivelFormacion.postnivelFormacion)
router.get("/", httpNivelFormacion.getNivelesFormacion)
router.get("/:codigo", httpNivelFormacion.getCodigonivel)
router.put("/:codigo", httpNivelFormacion.putnivelFormacion)

export default router