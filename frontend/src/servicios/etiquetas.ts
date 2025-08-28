import api from "./api";
import type { ICrearEtiquetaDTO } from "@/types";

const getEtiquetas = async () => {
    const res = await api.get("/etiquetas");
    return res.data;
};

const crearEtiqueta = async (data: ICrearEtiquetaDTO) => {
    const res = await api.post("/etiquetas", data);
    return res.data;
};

const getEtiquetasPorTarea = async (id: number) => {
    const res = await api.get(`/etiquetas/${id}/tarea`);
    return res.data;
};

const agregarEtiquetaATarea = async (tareaId: number, etiquetaId: number) => {
    const res = await api.post(`/tareas/${tareaId}/etiqueta`, { etiqueta_id: etiquetaId });
    return res.data;
};

const quitarEtiquetaDeTarea = async (tareaId: number, etiquetaId: number) => {
    const res = await api.delete(`/tareas/${tareaId}/etiqueta`, { 
        data: { etiqueta_id: etiquetaId } 
    });
    return res.data;
};

export { getEtiquetas, crearEtiqueta, getEtiquetasPorTarea, agregarEtiquetaATarea, quitarEtiquetaDeTarea };

