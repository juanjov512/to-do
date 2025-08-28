import db from "../../config/db";
import { ITarea, ICrearTareaDTO, IActualizarTareaDTO, IFiltroTareas, ITareaEtiquetas } from "./tareas.types";

async function getAllByUser(userId: number, filters: IFiltroTareas): Promise<ITarea[]> {
  const conditions: string[] = ["t.usuario_id = $1"];
  const params: any[] = [userId];
  let index = 2;

  if (filters.categoriaId) {
    conditions.push(`t.categoria_id = $${index++}`);
    params.push(filters.categoriaId);
  }

  if (typeof filters.completada === "boolean") {
    conditions.push(`t.completada = $${index++}`);
    params.push(filters.completada);
  }

  if (filters.prioridad) {
    conditions.push(`t.prioridad = $${index++}`);
    params.push(filters.prioridad);
  }

  if (filters.fechaVencimientoDesde) {
    conditions.push(`t.fecha_vencimiento >= $${index++}`);
    params.push(filters.fechaVencimientoDesde);
  }

  if (filters.fechaVencimientoHasta) {
    conditions.push(`t.fecha_vencimiento <= $${index++}`);
    params.push(filters.fechaVencimientoHasta);
  }

  if (filters.busqueda) {
    conditions.push(`(t.titulo ILIKE $${index} OR t.descripcion ILIKE $${index})`);
    params.push(`%${filters.busqueda}%`);
    index++;
  }

  let query = `
    SELECT 
      t.id,
      t.usuario_id,
      t.categoria_id,
      t.titulo,
      t.descripcion,
      t.prioridad,
      t.fecha_vencimiento,
      t.completada,
      t.created_at,
      t.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', e.id,
            'nombre', e.nombre
          )
        ) FILTER (WHERE e.id IS NOT NULL), '[]'
      ) AS etiquetas
    FROM tareas t
    LEFT JOIN tarea_etiquetas te ON t.id = te.tarea_id
    LEFT JOIN etiquetas e ON te.etiqueta_id = e.id
    WHERE ${conditions.join(" AND ")}
    GROUP BY t.id
  `;

  if (filters.ordenarPor) {
    query += ` ORDER BY t.${filters.ordenarPor} ${filters.orden || "asc"}`;
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
    `
      UPDATE tareas
      SET completada = NOT completada
      WHERE id = $1 AND usuario_id = $2
      RETURNING *
    `,
    [tareaId, userId]
  );
  return rows[0] || null;
}

async function addTagToTask(userId: number, tareaId: number, etiquetaId: number): Promise<ITareaEtiquetas | null> {
  const { rows } = await db.query<ITareaEtiquetas>(
    `
      INSERT INTO tarea_etiquetas (tarea_id, etiqueta_id)
      SELECT t.id, e.id
      FROM tareas t
      JOIN etiquetas e 
        ON e.id = $2 
       AND e.usuario_id = $3 
       AND t.usuario_id = $3
      WHERE t.id = $1
      ON CONFLICT (tarea_id, etiqueta_id) DO NOTHING
      RETURNING *
    `,
    [tareaId, etiquetaId, userId]
  );
  return rows[0] || null;
}

async function removeTagFromTask(userId: number, tareaId: number, etiquetaId: number): Promise<ITareaEtiquetas | null> {
  const { rows } = await db.query<ITareaEtiquetas>(
    `
      DELETE FROM tarea_etiquetas te
      USING tareas t, etiquetas e
      WHERE te.tarea_id = $1
        AND te.etiqueta_id = $2
        AND t.usuario_id = $3
        AND e.usuario_id = $3
      RETURNING te.*
    `,
    [tareaId, etiquetaId, userId]
  );
  return rows[0] || null;
}


export {
  getAllByUser,
  create,
  update,
  remove,
  toggleComplete,
  addTagToTask,
  removeTagFromTask,
}
