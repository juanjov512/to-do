import type { QueryResultRow } from "pg";

interface ITarea extends QueryResultRow {
  id: number;
  usuario_id: number;
  categoria_id: number | null;
  titulo: string;
  descripcion?: string;
  prioridad?: number;
  fecha_vencimiento?: Date;
  completada: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ICrearTareaDTO {
  categoria_id: number;
  titulo: string;
  descripcion?: string;
  prioridad?: number;
  fecha_vencimiento?: Date;
}

interface IActualizarTareaDTO {
  categoria_id?: number;
  titulo?: string;
  descripcion?: string;
  prioridad?: number;
  fecha_vencimiento?: Date;
  completada?: boolean;
}

interface IFiltroTareas {
  usuarioId: number;

  categoriaId?: number;
  completada?: boolean;
  prioridad?: number;
  fechaVencimientoDesde?: Date;
  fechaVencimientoHasta?: Date;

  busqueda?: string;

  ordenarPor?:
    | "created_at"
    | "updated_at"
    | "fecha_vencimiento"
    | "prioridad";
  orden?: "asc" | "desc";

  limite?: number;
  offset?: number;
}

export type {
  ITarea,
  ICrearTareaDTO,
  IActualizarTareaDTO,
  IFiltroTareas,
}

