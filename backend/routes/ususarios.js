import httpUsuario from "../controllers/usuarios.js";
import { Router } from "express";

const router = Router()

router.post("/", httpUsuario.posUsuario)
router.get("/traer" , httpUsuario.getUsusarios)
router.get("/todos" , httpUsuario.getUsusarios)
router.put("/edit" , httpUsuario.putUsuario)


export default router

