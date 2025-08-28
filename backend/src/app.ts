import express from "express";
import dotenv from "dotenv";
import { config } from "./config/env";
import cors from "cors";

import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { apiLimiter } from "./middlewares/rateLimiter";

import authRoutes from "./modules/auth/auth.routes";
import tareasRoutes from "./modules/tareas/tareas.routes";
import categoriasRoutes from "./modules/categorias/categorias.routes";
import etiquetasRoutes from "./modules/etiquetas/etiquetas.routes";

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

// Middlewares base
app.use(express.json());
app.use(logger);
app.use(apiLimiter);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/etiquetas", etiquetasRoutes);

// Error handler centralizado
app.use(errorHandler);

export default app;
