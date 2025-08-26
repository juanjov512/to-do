import db from "../../config/db";
import { ITarea, ICrearTareaDTO, IActualizarTareaDTO, IFiltroTareas } from "./tareas.types";

async function getAllByUser(userId: number, filters: IFiltroTareas): Promise<ITarea[]> {
  const conditions: string[] = ["usuario_id = $1"];
  const params: any[] = [userId];
  let index = 2;

  if (filters.categoriaId) {
    conditions.push(`categoria_id = $${index++}`);
    params.push(filters.categoriaId);
  }

  if (typeof filters.completada === "boolean") {
    conditions.push(`completada = $${index++}`);
    params.push(filters.completada);
  }

  if (filters.prioridad) {
    conditions.push(`prioridad = $${index++}`);
    params.push(filters.prioridad);
  }

  if (filters.fechaVencimientoDesde) {
    conditions.push(`fecha_vencimiento >= $${index++}`);
    params.push(filters.fechaVencimientoDesde);
  }

  if (filters.fechaVencimientoHasta) {
    conditions.push(`fecha_vencimiento <= $${index++}`);
    params.push(filters.fechaVencimientoHasta);
  }

  if (filters.busqueda) {
    conditions.push(`(titulo ILIKE $${index} OR descripcion ILIKE $${index})`);
    params.push(`%${filters.busqueda}%`);
    index++;
  }

  let query = `
    SELECT *
    FROM tareas
    WHERE ${conditions.join(" AND ")}
  `;

  if (filters.ordenarPor) {
    query += ` ORDER BY ${filters.ordenarPor} ${filters.orden || "asc"}`;
  }

  if (filters.limite) {
    query += ` LIMIT ${filters.limite}`;
  }
  if (filters.offset) {
    query += ` OFFSET ${filters.offset}`;
  }

  const { rows } = await db.query<ITarea>(query, params);
  return rows;
}

async function create(userId: number, dto: ICrearTareaDTO): Promise<ITarea> {
  const { categoria_id, titulo, descripcion, prioridad, fecha_vencimiento } = dto;
  const { rows } = await db.query<ITarea>(
    `INSERT INTO tareas (usuario_id, categoria_id, titulo, descripcion, prioridad, fecha_vencimiento)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *
    `,
    [userId, categoria_id, titulo, descripcion, prioridad, fecha_vencimiento]
  );
  return rows[0];
}

async function update(tareaId: number, userId: number, dto: IActualizarTareaDTO): Promise<ITarea | null> {
  const keys = Object.keys(dto);
  if (keys.length === 0) return null;

  const setClauses = keys.map((key, i) => `${key} = $${i + 1}`);
  const values = Object.values(dto);

  const query = `
    UPDATE tareas
    SET ${setClauses.join(", ")}
    WHERE id = $${keys.length + 1} AND usuario_id = $${keys.length + 2}
    RETURNING *;
  `;

  const { rows } = await db.query<ITarea>(query, [...values, tareaId, userId]);
  return rows[0] || null;
}

async function remove(tareaId: number, userId: number): Promise<boolean> {
  const { rowCount } = await db.query(
    `DELETE FROM tareas WHERE id = $1 AND usuario_id = $2`,
    [tareaId, userId]
  );
  return (rowCount || 0) > 0;
}

async function toggleComplete(tareaId: number, userId: number): Promise<ITarea | null> {
  const { rows } = await db.query<ITarea>(
    `UPDATE tareas
     SET completada = NOT completada
     WHERE id = $1 AND usuario_id = $2
     RETURNING *`,
    [tareaId, userId]
  );
  return rows[0] || null;
}

export {
  getAllByUser,
  create,
  update,
  remove,
  toggleComplete,
}
