import httpInstructor from "../controllers/instructorC.js";
import { Router } from "express";

const router = Router()

router.post("/i", httpInstructor.posInstructor)
router.get("/traer" , httpInstructor.getInstructorcc)
router.get("/todos" , httpInstructor.getInstructores)


export default router

