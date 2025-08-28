import { ITarea } from "@/types";

interface IItemTareaProps {
  tarea: ITarea;
  onEliminar: (id: number) => void;
  loading?: boolean;
}

export type { IItemTareaProps };
