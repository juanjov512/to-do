-- Insertar usuarios
INSERT INTO usuarios (nombre, email, password_hash)
VALUES 
  ('Juan Villegas', 'juan@example.com', '$2b$10$abcdefghijklmnopqrstuv'); -- hash dummy

-- Insertar categorías
INSERT INTO categorias (usuario_id, nombre)
VALUES
  (1, 'Trabajo'),
  (1, 'Personal'),
  (1, 'Estudio');

-- Insertar tareas
INSERT INTO tareas (usuario_id, categoria_id, titulo, descripcion, prioridad, fecha_vencimiento, completada)
VALUES
  (1, 1, 'Preparar presentación', 'Terminar slides', 4, CURRENT_DATE + 3, FALSE),
  (1, 1, 'Enviar informe semanal', 'Enviar reporte', 3, CURRENT_DATE + 1, TRUE),
  (1, 2, 'Comprar mercado', 'Frutas, verduras y leche', 2, CURRENT_DATE + 2, FALSE),
  (1, 2, 'Llamar al médico', 'Agendar cita de control', 5, CURRENT_DATE + 7, FALSE),
  (1, 3, 'Estudiar SQL', 'Practicar consultas JOIN y subqueries', 3, CURRENT_DATE + 5, FALSE),
  (1, 3, 'Revisar proyecto final', 'Corregir errores y entregar avances', 4, CURRENT_DATE + 10, FALSE);

-- Insertar etiquetas
INSERT INTO etiquetas (usuario_id, nombre)
VALUES
  (1, 'Urgente'),
  (1, 'Casa'),
  (1, 'Trabajo'),
  (1, 'Universidad');

-- Relación tareas ↔ etiquetas
INSERT INTO tarea_etiquetas (tarea_id, etiqueta_id)
VALUES
  (1, 1), -- Preparar presentación → Urgente
  (1, 3), -- Preparar presentación → Trabajo
  (2, 3), -- Enviar informe semanal → Trabajo
  (3, 2), -- Comprar mercado → Casa
  (4, 2), -- Llamar al médico → Casa
  (5, 4), -- Estudiar SQL → Universidad
  (6, 4), -- Revisar proyecto final → Universidad
  (6, 1); -- Revisar proyecto final → Urgente
