# ToDo API – Backend

API REST para gestión de **usuarios, autenticación, categorías, etiquetas y tareas**.  
Construida con **Node.js + Express + TypeScript + PostgreSQL**.

---

## Requisitos

- Node.js >= 18
- PostgreSQL >= 14
- Yarn o npm

---

## Instalación y ejecución

```bash
# Clonar repo
git clone https...
cd todo-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Crear base de datos y tablas
psql -U postgres -d todo -f schema.sql

# Ejecutar en desarrollo
npm run dev

# Build + producción
npm run build
npm run start
```

---

## Variables de entorno

En el archivo `.env` debes configurar:

```bash
PORT=3000
DATABASE_URL=postgres://todo_user:secret@db:5432/todo
JWT_SECRET=jwt_todo_secret
NODE_ENV=production
```

---

## Endpoints principales

### Autenticación

#### POST /api/auth/registro → Crear usuario

```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan", "email": "juan@mail.com", "password": "123456"}'
```

#### POST /api/auth/login → Login y obtener JWT

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "juan@mail.com", "password": "123456"}'
```

#### GET /api/auth/perfil → Perfil de usuario (requiere JWT)

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/auth/perfil
```

---

## Endpoints

### Autenticación

```bash
POST /api/auth/register
POST /api/auth/login
GET /api/auth/perfil
```

### Categorías

```bash
GET /api/categorias
POST /api/categorias
PUT /api/categorias/:id
DELETE /api/categorias/:id
```

### Etiquetas

```bash
GET /api/etiquetas
POST /api/etiquetas
PUT /api/etiquetas/:id
DELETE /api/etiquetas/:id
```

### Tareas

```bash
GET /api/tareas
POST /api/tareas
PUT /api/tareas/:id
DELETE /api/tareas/:id
```

---

## Docker

```bash
# Ejecutar contenedores
docker-compose up --build -d

# Detener contenedores
docker-compose down
```
