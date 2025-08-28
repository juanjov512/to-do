import { ITarea } from "@/types";

interface IListaTareasProps {
  tareas: ITarea[];
  onEliminar: (id: number) => void;
}

export type { IListaTareasProps };
