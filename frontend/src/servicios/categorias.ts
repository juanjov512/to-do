import api from "./api";
import type { ICrearCategoriaDTO, IActualizarCategoriaDTO } from "@/types";

const getCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data;
};

const crearCategoria = async (data: ICrearCategoriaDTO) => {
  const res = await api.post("/categorias", data);
  return res.data;
};

const actualizarCategoria = async (id: number, data: IActualizarCategoriaDTO) => {
  const res = await api.put(`/categorias/${id}`, data);
  return res.data;
};

const eliminarCategoria = async (id: number) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data;
};

const obtenerTareasPorCategoria = async (id: number) => {
  const res = await api.get(`/categorias/${id}/tareas`);
  return res.data;
};

export { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria, obtenerTareasPorCategoria };
