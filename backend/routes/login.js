import iniciarSesion from "../controllers/login.js";
import { Router } from "express";

const router = Router()

router.post("/", iniciarSesion.loginUsuario)

export default router