import { Router } from "express"
import * as controller from "./etiquetas.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.use(auth)

router.get("/", controller.listar)
router.post("/", controller.crear)

export default router
