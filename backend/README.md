# ToDo API – Backend

API REST for **user management, authentication, categories, tags and tasks**.  
Built with **Node.js + Express + TypeScript + PostgreSQL**.

## Requirements

- Node.js >= 18
- PostgreSQL >= 14
- Yarn o npm

## Installation

```bash
# Clone repo
git clone https...
cd todo-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Create database and tables
psql -U postgres -d todo -f schema.sql

# Run in development
npm run dev

# Build + production
npm run build
npm run start
```

## Docker

```bash
# Run containers
docker-compose up --build -d

# Stop containers
docker-compose down
```

# API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

### Register a New User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Authentication**: Not required

**Request Body:**

```json
{
  "nombre": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**

```json
{
  "id": "1",
  "nombre": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User

- **URL**: `/auth/login`
- **Method**: `POST`
- **Authentication**: Not required

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**

```json
{
  "user": {
    "id": "1",
    "nombre": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Tasks

### Get All Tasks

- **URL**: `/tareas`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)

**Query Parameters:**

- `completada` (boolean): Filter by completion status
- `categoria_id` (number): Filter by category
- `prioridad` (number): Filter by priority (1-5)

**Success Response (200 OK):**

```json
{
  "tareas": [
    {
      "id": 1,
      "titulo": "Comprar leche",
      "descripcion": "Ir al supermercado",
      "fecha_vencimiento": "2025-09-15",
      "prioridad": 2,
      "completada": false,
      "categoria_id": 1,
      "usuario_id": "1",
      "created_at": "2025-08-27T10:00:00.000Z",
      "updated_at": "2025-08-27T10:00:00.000Z",
      "etiquetas": [{ "id": 1, "nombre": "compras" }]
    }
  ]
}
```

### Create a New Task

- **URL**: `/tareas`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)

**Request Body:**

```json
{
  "titulo": "Hacer ejercicio",
  "descripcion": "Ir al gimnasio",
  "fecha_vencimiento": "2025-09-10",
  "prioridad": 3,
  "categoria_id": 2
}
```

**Success Response (201 Created):**

```json
{
  "id": 2,
  "titulo": "Hacer ejercicio",
  "descripcion": "Ir al gimnasio",
  "fecha_vencimiento": "2025-09-10T00:00:00.000Z",
  "prioridad": 3,
  "completada": false,
  "categoria_id": 2,
  "usuario_id": "1",
  "updated_at": "2025-08-28T02:30:00.000Z",
  "created_at": "2025-08-28T02:30:00.000Z"
}
```

### Update Task Completion Status

- **URL**: `/tareas/:id/completar`
- **Method**: `PUT`
- **Authentication**: Required (Bearer Token)

**Success Response (200 OK):**

```json
{
  "message": "Tarea marcada como completada",
  "tarea": {
    "id": 1,
    "completada": true
  }
}
```

## Categories

### Get All Categories

- **URL**: `/categorias`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "nombre": "Trabajo",
    "usuario_id": "1"
  },
  {
    "id": 2,
    "nombre": "Personal",
    "usuario_id": "1"
  }
]
```

### Create a New Category

- **URL**: `/categorias`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)

**Request Body:**

```json
{
  "nombre": "Estudios"
}
```

**Success Response (201 Created):**

```json
{
  "id": 3,
  "nombre": "Estudios",
  "usuario_id": "1"
}
```

## Tags

### Get All Tags

- **URL**: `/etiquetas`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "nombre": "importante",
    "usuario_id": "1"
  }
]
```

### Create a New Tag

- **URL**: `/etiquetas`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)

**Request Body:**

```json
{
  "nombre": "urgente"
}
```

**Success Response (201 Created):**

```json
{
  "id": 2,
  "nombre": "urgente",
  "usuario_id": "1"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": true,
  "message": "Validation error",
  "details": {
    "email": "El correo electrónico es requerido",
    "password": "La contraseña debe tener al menos 6 caracteres"
  }
}
```

### 401 Unauthorized

```json
{
  "error": true,
  "message": "No autorizado, token no proporcionado"
}
```

### 403 Forbidden

```json
{
  "error": true,
  "message": "No tienes permiso para realizar esta acción"
}
```

### 404 Not Found

```json
{
  "error": true,
  "message": "Tarea no encontrada"
}
```

### 500 Internal Server Error

```json
{
  "error": true,
  "message": "Error en el servidor"
}
```

## Rate Limiting

- All endpoints are rate limited to 500 requests per 15 minutes per IP address.
- Exceeding the limit will result in a 429 Too Many Requests response.

## Authentication

- All endpoints except `/auth/register` and `/auth/login` require authentication.
- Include the JWT token in the `Authorization` header:
  ```
  Authorization: Bearer your_jwt_token_here
  ```
