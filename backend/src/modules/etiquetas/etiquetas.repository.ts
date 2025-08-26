import db from "../../config/db"
import type { IEtiqueta } from "./etiquetas.types"

async function getAll(userId: number): Promise<IEtiqueta[]> {
  const { rows } = await db.query<IEtiqueta>(
    "SELECT * FROM etiquetas WHERE usuario_id = $1 ORDER BY created_at DESC",
    [userId]
  )
  return rows
}

async function create(userId: number, nombre: string): Promise<IEtiqueta> {
  const { rows } = await db.query<IEtiqueta>(
    "INSERT INTO etiquetas (usuario_id, nombre) VALUES ($1, $2) RETURNING *",
    [userId, nombre]
  )
  return rows[0]
}

export { getAll, create }
