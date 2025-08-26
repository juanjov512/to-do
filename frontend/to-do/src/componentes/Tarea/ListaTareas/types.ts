import { ITarea } from "@/types";

interface IListaTareasProps {
  tareas: ITarea[];
  onToggle: (id: number) => void;
  onEliminar: (id: number) => void;
}

export type { IListaTareasProps };
