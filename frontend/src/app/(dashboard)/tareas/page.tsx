"use client";

import { useState, useEffect, useCallback } from "react";
import { IFiltroTareas } from "@/types";
import ListaTareas from "@/componentes/Tarea/ListaTareas";
import FormularioCrearTarea from "@/componentes/Tarea/FormularioCrearTarea";
import FiltroTareas from "@/componentes/Tarea/FiltroTareas";
import styled from "styled-components";
import Cargando from "@/componentes/Comunes/Cargando";
import MensajeError from "@/componentes/Comunes/MensajeError";
import { useTareas } from "@/hooks/useTareas";
import { useError } from "@/contexto/ErrorProvider";

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

export default function TareasPage() {
  const [filtros, setFiltros] = useState<IFiltroTareas>({
    busqueda: "",
  });
  const { fetchTareas, tareas, loading, error, eliminarTarea } = useTareas();
  const { showError } = useError();

  const cargarTareas = useCallback(() => {
    fetchTareas(filtros);
  }, [fetchTareas, filtros]);

  useEffect(() => {
    cargarTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const handleEliminarTarea = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      try {
        await eliminarTarea(id);
        cargarTareas();
      } catch (error) {
        showError(`Error al eliminar tarea: ${error}`);
      }
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>Tareas</Title>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxHeight: "50px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <FiltroTareas filtros={filtros} onFiltrosChange={setFiltros} />
          <FormularioCrearTarea handleOnChange={cargarTareas} />
        </div>
      </Header>

      {loading && <Cargando />}
      {!loading && error && <MensajeError mensaje={error} />}
      {!loading && !error && (
        <ListaTareas tareas={tareas} onEliminar={handleEliminarTarea} />
      )}
    </PageContainer>
  );
}
