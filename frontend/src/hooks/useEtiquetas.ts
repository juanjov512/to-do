"use client";

import { useCallback, useEffect, useState } from "react";
import { crearEtiqueta, getEtiquetas } from "@/servicios/etiquetas";
import { ICrearEtiquetaDTO, IEtiqueta } from "@/types";

export const useEtiquetas = () => {
  const [etiquetas, setEtiquetas] = useState<IEtiqueta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEtiquetas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEtiquetas();
      setEtiquetas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar etiquetas');
    } finally {
      setLoading(false);
    }
  }, []);

  const agregarEtiqueta = async (data: ICrearEtiquetaDTO) => {
    try {
      const nueva = await crearEtiqueta(data);
      setEtiquetas(prev => [...prev, nueva]);
      return nueva;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear etiqueta');
      throw err;
    }
  };

  useEffect(() => {
    fetchEtiquetas();
  }, [fetchEtiquetas]);

  return { etiquetas, loading, error, fetchEtiquetas, agregarEtiqueta };
}
