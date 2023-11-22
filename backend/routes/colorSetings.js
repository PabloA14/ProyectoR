import { Router } from "express";
import httpColores from "../controllers/colorSetings.js";
const routes= Router()


routes.post("/", httpColores.postColor)
routes.get("/", httpColores.getColores)
routes.put("/:id", httpColores.putColor)


export default routes