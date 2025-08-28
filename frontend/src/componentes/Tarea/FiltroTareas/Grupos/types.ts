import { IFiltroTareas } from "@/types";
import { IFiltroTareasProps } from "../types";

interface IFiltroTareasGruposProps {
  filtros: IFiltroTareas;
  handleFiltroChange: (
    campo: keyof IFiltroTareasProps["filtros"],
    valor: IFiltroTareasProps["filtros"][keyof IFiltroTareasProps["filtros"]]
  ) => void;
}

export type { IFiltroTareasGruposProps };