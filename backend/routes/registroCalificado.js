import httpregistro from "../controllers/registroCalificado.js";
import { Router } from "express";
const router = Router()

router.post("/", httpregistro.postregistro)
router.get("/", httpregistro.getRegistrosCalifidos)
router.get("/:codigosnies", httpregistro.getcodigo)
router.put("/:codigo", httpregistro.putRegistro)


export default router