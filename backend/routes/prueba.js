import httpPrueba from "../controllers/pruebas.js";
import { Router } from "express";

const router = Router()

router.post("/", httpPrueba.postPrueba)


export default router

//asas