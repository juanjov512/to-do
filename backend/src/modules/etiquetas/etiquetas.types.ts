import type { QueryResultRow } from "pg"

interface IEtiqueta extends QueryResultRow {
  id: number
  usuario_id: number
  nombre: string
  created_at: Date
}

interface ICrearEtiquetaDTO {
  nombre: string
}

export type { IEtiqueta, ICrearEtiquetaDTO };
