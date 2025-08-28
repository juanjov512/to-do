import { IFiltroTareas } from "@/types";

interface IFiltroTareasProps {
  filtros: IFiltroTareas;
  onFiltrosChange: (filtros: IFiltroTareas) => void;
}

export type { IFiltroTareasProps };