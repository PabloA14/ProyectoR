import httpUsuario from "../controllers/usuarios.js";
import { Router } from "express";

const router = Router()

router.post("/", httpUsuario.posUsuario)
router.get("/todos", httpUsuario.getUsusarios)
router.get("/:codigo", httpUsuario.getUsuarioCodigo)
router.put("/:id", httpUsuario.putUsuario)
router.patch("/:id",httpUsuario.putUsuario)



export default router

