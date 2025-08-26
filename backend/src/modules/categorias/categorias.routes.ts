import { Router } from "express"
import * as controller from "./categorias.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.use(auth)

router.get("/", controller.listar)
router.post("/", controller.crear)
router.put("/:id", controller.actualizar)
router.delete("/:id", controller.eliminar)

export default router
