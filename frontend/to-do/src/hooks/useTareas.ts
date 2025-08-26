import { useState, useEffect } from "react";
import { 
  getTareas, 
  crearTarea, 
  actualizarTarea as actualizarTareaService, 
  eliminarTarea as eliminarTareaService
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
      const tareaActualizada = await actualizarTareaService(id, cambios);
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? tareaActualizada : t))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al actualizar tarea");
      throw err;
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      await eliminarTareaService(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al eliminar tarea");
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
  };
};
