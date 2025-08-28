import { Router } from "express";
import * as controller from "./tareas.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.use(auth);

router.get("/", controller.listar);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);
router.patch("/:id/completar", controller.completar);
router.post("/:id/etiqueta/:etiqueta_id", controller.agregarEtiqueta);
router.delete("/:id/etiqueta/:etiqueta_id", controller.quitarEtiqueta);

export default router;
