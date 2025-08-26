import { ITarea } from "@/types";

interface IItemTareaProps {
  tarea: ITarea;
  onToggle: (id: number) => void;
  onEliminar: (id: number) => void;
}

export type { IItemTareaProps };
