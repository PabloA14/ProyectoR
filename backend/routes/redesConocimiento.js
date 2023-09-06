import httpredes from "../controllers/RedConocimiento.js";
import { Router } from "express";
const router = Router()

router.post("/", httpredes.postRedes)
router.get("/", httpredes.getRedes)
router.get("/:codigo", httpredes.getCodigo)
router.put("/:id", httpredes.putRedes)
router.patch("/:id", httpredes.patchRedes)



export default router