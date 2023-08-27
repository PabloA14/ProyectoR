import httpredes from "../controllers/RedConocimiento.js";
import { Router } from "express";
const router = Router()

router.post("/", httpredes.postRedes)
router.get("/", httpredes.getRedes)
router.get("/:Codigo", httpredes.getCodigo)
router.put("/:codigo", httpredes.putRedes)


export default router