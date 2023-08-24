import httpprogramas from "../controllers/programasFormacion.js";
import { Router } from "express";

const router = Router()

router.post("/", httpprogramas.postPrograma)

export default router