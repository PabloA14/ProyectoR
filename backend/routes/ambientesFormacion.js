import httpAmbiente from "../controllers/ambientesFormacion.js"
import { Router } from "express";

const router = Router()

router.post("/", httpAmbiente.postambiente)
router.get("/", httpAmbiente.getAmbientes)
router.get("/:codigo", httpAmbiente.getCodigo)
router.put("/:id", httpAmbiente.putAmbiente)

export default router