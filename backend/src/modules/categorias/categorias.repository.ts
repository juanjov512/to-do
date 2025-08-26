import db from "../../config/db"
import type { ICategoria } from "./categorias.types"

async function getAll(userId: number): Promise<ICategoria[]> {
  const { rows } = await db.query<ICategoria>(
    "SELECT * FROM categorias WHERE usuario_id = $1 ORDER BY created_at DESC",
    [userId]
  )
  return rows
}

async function create(userId: number, nombre: string): Promise<ICategoria> {
  const { rows } = await db.query<ICategoria>(
    "INSERT INTO categorias (usuario_id, nombre) VALUES ($1, $2) RETURNING *",
    [userId, nombre]
  )
  return rows[0]
}

async function update(userId: number, id: number, nombre: string): Promise<ICategoria | null> {
  const { rows } = await db.query<ICategoria>(
    "UPDATE categorias SET nombre = $1, updated_at = NOW() WHERE id = $2 AND usuario_id = $3 RETURNING *",
    [nombre, id, userId]
  )
  return rows[0] || null
}

async function remove(userId: number, id: number): Promise<boolean> {
  const { rowCount } = await db.query(
    "DELETE FROM categorias WHERE id = $1 AND usuario_id = $2",
    [id, userId]
  )
  return (rowCount || 0) > 0
}

export { getAll, create, update, remove }
