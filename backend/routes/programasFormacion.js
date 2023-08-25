import httpprogramas from "../controllers/programasFormacion.js";
import { Router } from "express";

const router = Router()

router.post("/", httpprogramas.postPrograma)
router.get("/traer" , httpprogramas.getProgramaCod)
router.get("/traer/todos", httpprogramas.getProgramas)
router.put("/", httpprogramas.putProgramas)
export default router