import React from "react";
import { ListaContainer } from "./styled";
import { IListaTareasProps } from "./types";
import ItemTarea from "../ItemTarea";

const ListaTareas: React.FC<IListaTareasProps> = ({
  tareas,
  onToggle,
  onEliminar,
}) => {
  return (
    <ListaContainer>
      {tareas.map((t) => (
        <ItemTarea
          key={t.id}
          tarea={t}
          onToggle={onToggle}
          onEliminar={onEliminar}
        />
      ))}
    </ListaContainer>
  );
};

export default ListaTareas;
