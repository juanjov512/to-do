"use client";

import { useCallback, useEffect, useState } from "react";
import Select from "@/componentes/Comunes/Select";
import { TagList, TagItem, TagContainer, Container } from "./styled";
import { useTareas } from "@/hooks/useTareas";
import type { IEtiqueta } from "@/types";
import Button from "@/componentes/Comunes/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useError } from "@/contexto/ErrorProvider";

interface EtiquetasTareaProps {
  tareaId: number;
  etiquetasIniciales?: Array<{ id: number; nombre: string }>;
  todasLasEtiquetas?: IEtiqueta[];
  onUpdate?: () => void;
}

export default function EtiquetasTarea({
  tareaId,
  etiquetasIniciales,
  todasLasEtiquetas,
  onUpdate,
}: EtiquetasTareaProps) {
  const [etiquetas, setEtiquetas] = useState(etiquetasIniciales || []);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState("");
  const { agregarEtiqueta, quitarEtiqueta } = useTareas();
  const { showError } = useError();

  useEffect(() => {
    setEtiquetas(etiquetasIniciales || []);
  }, [etiquetasIniciales]);

  const handleAgregarEtiqueta = useCallback(async () => {
    if (!etiquetaSeleccionada) return;

    try {
      await agregarEtiqueta(tareaId, parseInt(etiquetaSeleccionada));
      const etiquetaAgregada = todasLasEtiquetas?.find(
        (etiqueta) => etiqueta.id === parseInt(etiquetaSeleccionada)
      );
      if (etiquetaAgregada) {
        setEtiquetas((prev) => [...prev, etiquetaAgregada]);
        setEtiquetaSeleccionada("");
        onUpdate?.();
      }
    } catch (err) {
      showError("Error al agregar etiqueta" + err);
    }
  }, [
    agregarEtiqueta,
    tareaId,
    etiquetaSeleccionada,
    todasLasEtiquetas,
    onUpdate,
    showError,
  ]);

  const handleQuitarEtiqueta = useCallback(
    async (etiquetaId: number) => {
      try {
        await quitarEtiqueta(tareaId, etiquetaId);
        setEtiquetas((prev) => prev.filter((e) => e.id !== etiquetaId));
        onUpdate?.();
      } catch (err) {
        showError("Error al quitar etiqueta");
      }
    },
    [quitarEtiqueta, tareaId, onUpdate, showError]
  );

  const etiquetasDisponibles =
    todasLasEtiquetas?.filter(
      (etiqueta) => !etiquetas.some((e) => e.id === etiqueta.id)
    ) || [];

  return (
    <Container>
      <TagContainer>
        <TagList>
          {etiquetas.map((etiqueta) => (
            <TagItem key={etiqueta.id}>
              {etiqueta.nombre}
              <button
                type="button"
                onClick={() => handleQuitarEtiqueta(etiqueta.id)}
              >
                x
              </button>
            </TagItem>
          ))}
        </TagList>
      </TagContainer>

      {etiquetasDisponibles.length > 0 && (
        <div>
          <Select
            value={etiquetaSeleccionada}
            onChange={setEtiquetaSeleccionada}
            options={etiquetasDisponibles.map((etiqueta) => ({
              value: etiqueta.id.toString(),
              label: etiqueta.nombre,
            }))}
            variant="ghost"
            prefixIcon={{ icon: faTag, color: "#6B7280" }}
            placeholder={<FontAwesomeIcon icon={faTag} color={"#6B7280"} />}
          />
          {etiquetaSeleccionada && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleAgregarEtiqueta()}
            >
              <FontAwesomeIcon icon={faPlus} color={"#6B7280"} />
            </Button>
          )}
        </div>
      )}
    </Container>
  );
}
