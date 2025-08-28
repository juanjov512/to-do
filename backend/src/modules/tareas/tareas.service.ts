import * as repo from "./tareas.repository";
import { ICrearTareaDTO, IActualizarTareaDTO, ITarea, ITareaEtiquetas, IActualizarEtiquetasTareaDTO } from "./tareas.types";

async function listarTareas(userId: number, filtros: Record<string, any>): Promise<ITarea[]> {
  return await repo.getAllByUser(userId, filtros);
}

async function crearTarea(userId: number, dto: ICrearTareaDTO): Promise<ITarea> {
  return await repo.create(userId, dto);
}

async function actualizarTarea(userId: number, tareaId: number, dto: IActualizarTareaDTO): Promise<ITarea | null> {
  return await repo.update(tareaId, userId, dto);
}

async function eliminarTarea(userId: number, tareaId: number): Promise<boolean> {
  return await repo.remove(tareaId, userId);
}

async function completarTarea(userId: number, tareaId: number): Promise<ITarea | null> {
  return await repo.toggleComplete(tareaId, userId);
}

async function agregarEtiquetaATarea(userId: number, tareaId: number, etiquetaId: number): Promise<ITareaEtiquetas | null> {
  return await repo.addTagToTask(userId, tareaId, etiquetaId);
}

async function quitarEtiquetaDeTarea(userId: number, tareaId: number, etiquetaId: number): Promise<ITareaEtiquetas | null> {
  return await repo.removeTagFromTask(userId, tareaId, etiquetaId);
}

export {
  listarTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  completarTarea,
  agregarEtiquetaATarea,
  quitarEtiquetaDeTarea,
}
