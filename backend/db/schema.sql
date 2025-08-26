-- Eliminar tablas si ya existen (para reiniciar entorno de dev)
DROP TABLE IF EXISTS tarea_etiquetas CASCADE;
DROP TABLE IF EXISTS etiquetas CASCADE;
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, nombre)
);

-- Tabla de Tareas
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    prioridad SMALLINT CHECK (prioridad BETWEEN 1 AND 5),
    fecha_vencimiento DATE,
    completada BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para filtros frecuentes
CREATE INDEX idx_tareas_usuario ON tareas(usuario_id);
CREATE INDEX idx_tareas_categoria ON tareas(categoria_id);
CREATE INDEX idx_tareas_completada ON tareas(completada);
CREATE INDEX idx_tareas_fecha_vencimiento ON tareas(fecha_vencimiento);

-- Tabla de Etiquetas
CREATE TABLE etiquetas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, nombre)
);

-- Relación Muchos a Muchos (Tareas ↔ Etiquetas)
CREATE TABLE tarea_etiquetas (
    tarea_id INT NOT NULL REFERENCES tareas(id) ON DELETE CASCADE,
    etiqueta_id INT NOT NULL REFERENCES etiquetas(id) ON DELETE CASCADE,
    PRIMARY KEY (tarea_id, etiqueta_id)
);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Agregar trigger a tablas principales
CREATE TRIGGER trigger_usuarios_updated
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_categorias_updated
BEFORE UPDATE ON categorias
FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_tareas_updated
BEFORE UPDATE ON tareas
FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();
