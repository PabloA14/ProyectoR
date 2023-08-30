import httpregistro from "../controllers/registroCalificado.js";
import { Router } from "express";
const router = Router()

router.post("/", httpregistro.postregistro)

export default router