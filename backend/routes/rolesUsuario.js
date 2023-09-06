import httpRoles from "../controllers/rolesUsuario.js"
import { Router } from "express";
const router = Router()

router.post("/", httpRoles.postRoles)
router.get("/", httpRoles.getRoles)
router.get("/:Codigo", httpRoles.getCodigo)
router.put("/:id", httpRoles.putRoles)
router.patch("/:id", httpRoles.patchRoles)



export default router