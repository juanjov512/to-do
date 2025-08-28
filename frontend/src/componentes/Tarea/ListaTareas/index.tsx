import React from "react";
import { ListaContainer } from "./styled";
import type { IListaTareasProps } from "./types";
import ItemTarea from "../ItemTarea";

const ListaTareas: React.FC<IListaTareasProps> = ({ tareas, onEliminar }) => {
  return (
    <ListaContainer>
      {tareas.map((tarea) => (
        <ItemTarea key={tarea.id} tarea={tarea} onEliminar={onEliminar} />
      ))}
    </ListaContainer>
  );
};

export default ListaTareas;
