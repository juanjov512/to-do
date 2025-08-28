import type { ICrearTareaDTO } from "@/types";

interface IFormularioTareaProps {
  onAgregar: (payload: ICrearTareaDTO) => Promise<void> | void;
}

interface IFormValues {
    categoria_id: number;
    titulo: string;
    descripcion?: string;
    prioridad?: number;
    fecha_vencimiento?: Date;
}

export type { IFormularioTareaProps, IFormValues };
