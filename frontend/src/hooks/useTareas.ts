"use client";

import { useState, useEffect } from "react";
import { 
  getTareas, 
  crearTarea, 
  actualizarTarea as actualizarTareaService, 
  eliminarTarea as eliminarTareaService,
  agregarEtiqueta as agregarEtiquetaService,
  quitarEtiqueta as quitarEtiquetaService,
} from "@/servicios/tareas";
import type { ICrearTareaDTO, IActualizarTareaDTO, ITarea, IFiltroTareas } from "@/types";

export const useTareas = () => {
  const [tareas, setTareas] = useState<ITarea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTareas = async (filtros: IFiltroTareas) => {
    setLoading(true);
    try {
      const data = await getTareas(filtros);
      setTareas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al obtener tareas");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const agregarTarea = async (nuevaTarea: ICrearTareaDTO) => {
    try {
      const tareaCreada = await crearTarea(nuevaTarea);
      setTareas((prev) => [...prev, tareaCreada]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear tarea");
      throw err;
    }
  };

  const actualizarTarea = async (id: number, cambios: IActualizarTareaDTO) => {
    try {
      const updateData: Partial<ITarea> = {};
      if (cambios.titulo !== undefined) updateData.titulo = cambios.titulo;
      if (cambios.descripcion !== undefined)
        updateData.descripcion = cambios.descripcion;
      if (cambios.fecha_vencimiento !== undefined)
        updateData.fecha_vencimiento = cambios.fecha_vencimiento;
      if (cambios.prioridad !== undefined) updateData.prioridad = cambios.prioridad;
      if (cambios.categoria_id !== undefined)
        updateData.categoria_id = cambios.categoria_id;
      if (cambios.completada !== undefined)
        updateData.completada = cambios.completada;

      const tareaActualizada = await actualizarTareaService(id, updateData);
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? tareaActualizada : t))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al actualizar tarea");
      throw err;
    }
  };

  const eliminarTarea = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      try {
        await eliminarTareaService(id);
        setTareas((prev) => prev.filter((t) => t.id !== id));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al eliminar tarea");
        throw err;
      }
    }
  };

  const agregarEtiqueta = async (tarea_id: number, etiqueta_id: number) => {
    try {
      await agregarEtiquetaService(tarea_id, etiqueta_id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al agregar etiqueta");
      throw err;
    }
  };

  const quitarEtiqueta = async (tareaId: number, etiquetaId: number) => {
    try {
      await quitarEtiquetaService(tareaId, etiquetaId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al quitar etiqueta");
      throw err;
    }
  };

  useEffect(() => {
    fetchTareas({});
  }, []);

  return {
    tareas,
    loading,
    error,
    fetchTareas,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    agregarEtiqueta,
    quitarEtiqueta,
  };
};
