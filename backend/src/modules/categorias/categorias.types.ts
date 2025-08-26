import type { QueryResultRow } from "pg"

interface ICategoria extends QueryResultRow {
  id: number
  usuario_id: number
  nombre: string
  created_at: Date
  updated_at: Date
}

interface ICrearCategoriaDTO {
  nombre: string
}

interface IActualizarCategoriaDTO {
  nombre?: string
}

export type { ICategoria, ICrearCategoriaDTO, IActualizarCategoriaDTO }
