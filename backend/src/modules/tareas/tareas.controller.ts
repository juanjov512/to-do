import { Request, Response, NextFunction } from "express";
import * as service from "./tareas.service";
import { IFiltroTareas } from "./tareas.types";

async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    const filters: IFiltroTareas = {
      categoriaId: req.query.categoria_id ? Number(req.query.categoria_id) : undefined,
      completada: req.query.completada !== undefined 
        ? req.query.completada === "true" 
        : undefined,
      prioridad: req.query.prioridad ? Number(req.query.prioridad) : undefined,
      fechaVencimientoDesde: req.query.fecha_vencimiento_desde 
        ? new Date(req.query.fecha_vencimiento_desde as string) 
        : undefined,
      fechaVencimientoHasta: req.query.fecha_vencimiento_hasta 
        ? new Date(req.query.fecha_vencimiento_hasta as string) 
        : undefined,
      busqueda: req.query.busqueda as string,
      ordenarPor: req.query.ordenar_por as IFiltroTareas["ordenarPor"],
      orden: (req.query.orden as IFiltroTareas["orden"]) || "asc",
      limite: req.query.limite ? Number(req.query.limite) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined,
    };
    const tareas = await service.listarTareas((req.user as any).id, filters);
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

async function agregarEtiqueta(req: Request, res: Response, next: NextFunction) {
  try {
    const resultado = await service.agregarEtiquetaATarea((req.user as any).id, Number(req.params.id), Number(req.params.etiqueta_id));
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

async function quitarEtiqueta(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await service.quitarEtiquetaDeTarea((req.user as any).id, Number(req.params.id), Number(req.params.etiqueta_id));
    if (!ok) return res.status(404).json({ message: "Etiqueta no encontrada" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export { listar, crear, actualizar, eliminar, completar, agregarEtiqueta, quitarEtiqueta };
