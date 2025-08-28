import React, { useState } from "react";
import { ItemWrapper, ItemInfo, ItemTitle, Row } from "./styled";
import type { IItemTareaProps } from "./types";
import EtiquetasTarea from "../EtiquetasTarea";
import { useEtiquetas } from "@/hooks/useEtiquetas";
import { useTareas } from "@/hooks/useTareas";
import Checkbox from "@/componentes/Comunes/Checkbox";
import Button from "@/componentes/Comunes/Button";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormularioEditarTarea from "../FormularioEditarTarea";

const ItemTarea: React.FC<IItemTareaProps> = ({
  tarea,
  onEliminar,
  loading,
}) => {
  const { etiquetas } = useEtiquetas();
  const { actualizarTarea } = useTareas();
  const [completada, setCompletada] = useState(tarea.completada || false);
  const [open, setOpen] = useState(false);

  const handleToggleCompletada = () => {
    actualizarTarea(tarea.id, { completada: !completada });
  };

  const handleEditar = () => {
    setOpen(true);
  };

  return (
    <ItemWrapper>
      <Row>
        <ItemInfo>
          <Checkbox
            checked={completada}
            onCheckedChange={() => {
              setCompletada(!completada);
              handleToggleCompletada();
            }}
            disabled={loading}
          />
          <ItemTitle $completed={completada}>{tarea.titulo}</ItemTitle>
          <span>{tarea.descripcion}</span>
        </ItemInfo>
        {tarea.fecha_vencimiento && (
          <span>{new Date(tarea.fecha_vencimiento).toLocaleDateString()}</span>
        )}
        <div>
          <Button
            onClick={() => onEliminar(tarea.id)}
            icon={{ icon: faTrash, color: "#ef4444" }}
            variant="ghost"
          />
          <Button
            onClick={handleEditar}
            icon={{ icon: faEdit, color: "#6b7280" }}
            variant="ghost"
          />
        </div>
      </Row>

      <EtiquetasTarea
        todasLasEtiquetas={etiquetas}
        etiquetasIniciales={tarea.etiquetas}
        tareaId={tarea.id}
      />

      <FormularioEditarTarea
        tarea={tarea}
        open={open}
        onClose={() => setOpen(false)}
      />
    </ItemWrapper>
  );
};

export default ItemTarea;
