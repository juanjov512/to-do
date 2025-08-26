"use client";

import { useState, useEffect } from "react";
import { ICategoria, ICrearCategoriaDTO } from "@/types";
import { getCategorias, crearCategoria, eliminarCategoria } from "@/servicios/categorias";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const agregarCategoria = async (data: ICrearCategoriaDTO) => {
    const nueva = await crearCategoria(data);
    setCategorias(prev => [...prev, nueva]);
  };

  const eliminar = async (id: number) => {
    await eliminarCategoria(id);
    setCategorias(prev => prev.filter(cat => cat.id !== id));
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return { categorias, loading, error, fetchCategorias, agregarCategoria, eliminar };
};
