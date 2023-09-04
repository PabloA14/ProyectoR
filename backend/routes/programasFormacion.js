import httpprogramas from "../controllers/programasFormacion.js";
import { Router } from "express";

const router = Router()

router.post("/", httpprogramas.postPrograma)
router.get("/traer", httpprogramas.getProgramaCod)
router.get("/", httpprogramas.getProgramas)
router.put("/:id", httpprogramas.putProgramas)
export default router