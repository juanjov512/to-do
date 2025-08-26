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
  
const actualizarEtiqueta = async (id: number, data: ICrearEtiquetaDTO) => {
    const res = await api.put(`/etiquetas/${id}`, data);
    return res.data;
};
  
const eliminarEtiqueta = async (id: number) => {
    const res = await api.delete(`/etiquetas/${id}`);
    return res.data;
};

export { getEtiquetas, crearEtiqueta, actualizarEtiqueta, eliminarEtiqueta };

