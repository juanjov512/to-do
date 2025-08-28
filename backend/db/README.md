# Consultas de Inteligencia de Negocio

### 1. Análisis de Participación de Usuarios

**Pregunta:** ¿Cuál es el promedio de tareas creadas por usuario en los últimos 30 días, y cómo se compara con los 30 días anteriores?

```sql
WITH ultimos_30 AS (
  SELECT COUNT(*)::decimal / COUNT(DISTINCT usuario_id) AS prom
  FROM tareas
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
previos_30 AS (
  SELECT COUNT(*)::decimal / COUNT(DISTINCT usuario_id) AS prom
  FROM tareas
  WHERE created_at >= NOW() - INTERVAL '60 days'
    AND created_at < NOW() - INTERVAL '30 days'
)
SELECT u.prom AS promedio_ultimos_30, p.prom AS promedio_previos_30
FROM ultimos_30 u, previos_30 p;
```

### 2. Tendencias de Tasa de Completado

**Pregunta:** ¿Cuál es la tasa de completado diaria de tareas en los últimos 90 días, agrupada por nivel de prioridad?

```sql
SELECT
  DATE(t.updated_at) AS dia,
  t.prioridad,
  COUNT(*) FILTER (WHERE t.completada) * 100.0 / COUNT(*) AS tasa_completado
FROM tareas t
WHERE t.updated_at >= NOW() - INTERVAL '90 days'
GROUP BY dia, t.prioridad
ORDER BY dia, t.prioridad;
```

---

### 3. Rendimiento por Categoría

**Pregunta:** ¿Qué categorías tienen las tasas de completado más altas y más bajas, y cuál es el tiempo promedio de completado para cada categoría?

```sql
SELECT
  c.nombre AS categoria,
  COUNT(*) FILTER (WHERE t.completada) * 100.0 / COUNT(*) AS tasa_completado,
  AVG(t.updated_at - t.created_at) FILTER (WHERE t.completada) AS promedio_tiempo
FROM tareas t
JOIN categorias c ON c.id = t.categoria_id
GROUP BY c.id, c.nombre
ORDER BY tasa_completado DESC;
```

---

### 4. Patrones de Productividad del Usuario

**Pregunta:** ¿Cuáles son las horas pico y días de la semana cuando los usuarios crean más tareas, y cuándo las completan?

```sql
SELECT
  EXTRACT(DOW FROM t.created_at) AS dia_semana,
  EXTRACT(HOUR FROM t.created_at) AS hora,
  COUNT(*) AS tareas_creadas
FROM tareas t
GROUP BY dia_semana, hora
ORDER BY tareas_creadas DESC;

SELECT
  EXTRACT(DOW FROM t.updated_at) AS dia_semana,
  EXTRACT(HOUR FROM t.updated_at) AS hora,
  COUNT(*) AS tareas_completadas
FROM tareas t
WHERE t.completada
GROUP BY dia_semana, hora
ORDER BY tareas_completadas DESC;
```

---

### 5. Análisis de Tareas Vencidas

**Pregunta:** ¿Cuántas tareas están actualmente vencidas, agrupadas por usuario y categoría, y cuál es el promedio de días que están vencidas?

```sql
SELECT
  u.nombre AS usuario,
  c.nombre AS categoria,
  COUNT(*) AS tareas_vencidas,
  AVG(NOW()::date - t.fecha_vencimiento) AS dias_promedio_vencidas
FROM tareas t
JOIN usuarios u ON u.id = t.usuario_id
LEFT JOIN categorias c ON c.id = t.categoria_id
WHERE NOT t.completada
  AND t.fecha_vencimiento < NOW()::date
GROUP BY u.id, u.nombre, c.id, c.nombre
ORDER BY tareas_vencidas DESC;
```

---

### 6. Estadísticas de Uso de Etiquetas

**Pregunta:** ¿Cuáles son las etiquetas más frecuentemente utilizadas, y qué etiquetas están asociadas con las tasas de completado más altas?

```sql
SELECT
  e.nombre AS etiqueta,
  COUNT(*) AS veces_usada,
  COUNT(*) FILTER (WHERE t.completada) * 100.0 / COUNT(*) AS tasa_completado
FROM tarea_etiquetas te
JOIN etiquetas e ON e.id = te.etiqueta_id
JOIN tareas t ON t.id = te.tarea_id
GROUP BY e.id, e.nombre
ORDER BY veces_usada DESC;
```

---

### 7. Métricas de Retención de Usuarios

**Pregunta:** ¿Cuántos usuarios han creado al menos una tarea en cada una de las últimas 4 semanas, y cuál es la tasa de retención semana a semana?

```sql
WITH semanas AS (
  SELECT
    usuario_id,
    DATE_TRUNC('week', created_at) AS semana
  FROM tareas
  WHERE created_at >= NOW() - INTERVAL '28 days'
  GROUP BY usuario_id, DATE_TRUNC('week', created_at)
)
SELECT semana, COUNT(DISTINCT usuario_id) AS usuarios_activos
FROM semanas
GROUP BY semana
ORDER BY semana;
```

_(La retención semana a semana se calcula comparando el % de usuarios que aparecen en varias semanas consecutivas.)_

### 9. Tendencias Estacionales

**Pregunta:** ¿Cómo varía la creación y completado de tareas por mes en el último año, y hay algún patrón estacional?

```sql
SELECT
  DATE_TRUNC('month', created_at) AS mes,
  COUNT(*) AS tareas_creadas,
  COUNT(*) FILTER (WHERE completada) AS tareas_completadas
FROM tareas
WHERE created_at >= NOW() - INTERVAL '1 year'
GROUP BY mes
ORDER BY mes;
```

---

### 10. Benchmarking de Rendimiento

**Pregunta:** ¿Qué usuarios están en el 10% superior por tasa de completado de tareas, y cuál es el número promedio de tareas que manejan simultáneamente?

```sql
WITH tasa AS (
  SELECT
    usuario_id,
    COUNT(*) FILTER (WHERE completada) * 1.0 / NULLIF(COUNT(*),0) AS tasa_completado,
    COUNT(*) FILTER (WHERE NOT completada) AS tareas_pendientes
  FROM tareas
  GROUP BY usuario_id
),
percentiles AS (
  SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY tasa_completado) AS p90
  FROM tasa
)
SELECT u.nombre, t.tasa_completado, t.tareas_pendientes
FROM tasa t
JOIN usuarios u ON u.id = t.usuario_id
JOIN percentiles p ON t.tasa_completado >= p.p90
ORDER BY t.tasa_completado DESC;
```
