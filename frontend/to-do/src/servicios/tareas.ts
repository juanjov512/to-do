import api from "./api";
import type { ICrearTareaDTO, IActualizarTareaDTO, IFiltroTareas } from "@/types";

const getTareas = async (filtros: IFiltroTareas) => {
    const res = await api.get("/tareas", { params: filtros });
    return res.data;
};
  
const crearTarea = async (data: ICrearTareaDTO) => {
    const res = await api.post("/tareas", data);
    return res.data;
};
  
const actualizarTarea = async (id: number, data: IActualizarTareaDTO) => {
    const res = await api.put(`/tareas/${id}`, data);
    return res.data;
};
  
const eliminarTarea = async (id: number) => {
    const res = await api.delete(`/tareas/${id}`);
    return res.data;
};

export { getTareas, crearTarea, actualizarTarea, eliminarTarea };

