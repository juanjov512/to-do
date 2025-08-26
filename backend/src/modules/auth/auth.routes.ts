import { Router } from "express";
import * as controller from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/registro", controller.registro);
router.post("/login", controller.login);
router.get("/perfil", auth, controller.perfil);

export default router;
