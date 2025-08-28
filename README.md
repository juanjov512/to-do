# 📝 Todo App - Full Stack Task Management

A modern, full-stack task management application built with Next.js, TypeScript, Node.js, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure login and registration
- **Task Management**: Create, read, update, and delete tasks
- **Categories & Tags**: Organize tasks with categories and tags
- **Priority Levels**: Set task priorities (1-5)
- **Due Dates**: Track task deadlines
- **Responsive Design**: Works on desktop and mobile

## 🛠 Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- Styled Components
- React Hook Form + Yup Validation
- Font Awesome Icons
- Axios for API calls

### Backend

- Node.js + Express
- TypeScript
- PostgreSQL with pg
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🚀 Getting Started

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/juanjov512/to-do.git
   cd todo/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory with:

   ```
    DB_HOST=db
    DB_PORT=5432
    DB_USER=todo_user
    DB_PASSWORD=secret_password
    DB_NAME=todo

    JWT_SECRET=jwt_todo_secret
    NODE_ENV=development
    PORT=3001
    FRONTEND_URL=http://localhost:3000
   ```

4. **Database setup**

   ```sql
   CREATE DATABASE todo_db;
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

## 🌐 API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/perfil` - Get current user profile

### Tasks

- `GET /api/tareas` - Get all tasks
- `POST /api/tareas` - Create a new task
- `GET /api/tareas/:id` - Get a single task
- `DELETE /api/tareas/:id` - Delete a task
- `PUT /api/tareas/:id/completar` - Complete a task
- `POST /api/tareas/:id/etiqueta/:etiqueta_id` - Add a tag to a task
- `DELETE /api/tareas/:id/etiqueta/:etiqueta_id` - Remove a tag from a task

### Categories

- `GET /api/categorias` - Get all categories
- `POST /api/categorias` - Create a new category
- `GET /api/categorias/:id` - Get a single category
- `DELETE /api/categorias/:id` - Delete a category

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create a new tag

## 📦 Project Structure

```
todo/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── modules/        # Modules
│   │   │   ├── auth/       # Authentication module
│   │   │   ├── categorias/ # Categories module
│   │   │   ├── etiquetas/  # Tags module
│   │   │   └── tareas/     # Tasks module
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   ├── docker-compose.yml  # Docker configuration
│   ├── package.json        # Package configuration
│   └── tsconfig.json       # TypeScript configuration
│
└── frontend/
    ├── src/
    │   ├── app/            # Next.js app directory
    │   ├── componentes/    # Reusable components
    │   ├── config/         # Configuration files
    │   ├── contexto/       # React context providers
    │   ├── hooks/          # Custom hooks
    │   ├── lib/            # Custom utils
    │   ├── providers/      # React context providers
    │   ├── servicios/      # API service functions
    │   ├── styles/         # Styled components
    │   ├── types/          # TypeScript types
    │   ├── utils/          # Utility functions
    │   └── validations/    # Custom validations
    ├── package.json        # Package configuration
    ├── middleware.ts       # Next.js middleware
    └── tsconfig.json       # TypeScript configuration
```

## 🔧 Environment Variables

### Backend (`.env`)

- `PORT` - Server port (default: 4000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Environment (development/production)

### Frontend (`.env.local`)

- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
