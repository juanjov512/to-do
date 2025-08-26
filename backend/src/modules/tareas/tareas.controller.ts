import { Request, Response, NextFunction } from "express";
import * as service from "./tareas.service";

async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    const tareas = await service.listarTareas((req.user as any).id, req.query);
    res.json(tareas);
  } catch (err) {
    next(err);
  }
}

async function crear(req: Request, res: Response, next: NextFunction) {
  try {
    const tarea = await service.crearTarea((req.user as any).id, req.body);
    res.status(201).json(tarea);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req: Request, res: Response, next: NextFunction) {
  try {
    const tarea = await service.actualizarTarea((req.user as any).id, Number(req.params.id), req.body);
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await service.eliminarTarea((req.user as any).id, Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function completar(req: Request, res: Response, next: NextFunction) {
  try {
    const tarea = await service.completarTarea((req.user as any).id, Number(req.params.id));
    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(tarea);
  } catch (err) {
    next(err);
  }
}

export { listar, crear, actualizar, eliminar, completar };
