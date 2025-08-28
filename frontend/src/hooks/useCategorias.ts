"use client";

import { useState, useEffect, useCallback } from "react";
import { ICategoria, ICrearCategoriaDTO } from "@/types";
import { getCategorias, crearCategoria, eliminarCategoria } from "@/servicios/categorias";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  const agregarCategoria = async (data: ICrearCategoriaDTO) => {
    try {
      const nueva = await crearCategoria(data);
      setCategorias(prev => [...prev, nueva]);
      return nueva;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear categoría');
      throw err;
    }
  };

  const eliminar = async (id: number) => {
    try {
      await eliminarCategoria(id);
      setCategorias(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar categoría');
      throw err;
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return { categorias, loading, error, fetchCategorias, agregarCategoria, eliminar };
};
