import React from "react";
import { ItemContainer } from "./styled";
import { IItemTareaProps } from "./types";
import Button from "@/componentes/Comunes/Button";

const ItemTarea: React.FC<IItemTareaProps> = ({
  tarea,
  onToggle,
  onEliminar,
}) => {
  return (
    <ItemContainer
      completada={!!tarea.completada}
      onClick={() => onToggle(tarea.id)}
    >
      <span>{tarea.titulo}</span>
      <Button
        type="button"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onEliminar(tarea.id);
        }}
      >
        Eliminar
      </Button>
    </ItemContainer>
  );
};

export default ItemTarea;
