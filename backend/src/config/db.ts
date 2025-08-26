import { Pool } from "pg";
import type { PoolClient, QueryResult, QueryResultRow } from "pg";
import { config } from "./env";

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      max: 10, // conexiones máximas en el pool
      idleTimeoutMillis: 30000, // cerrar conexiones inactivas
    });

    this.pool.on("connect", () => {
      console.log("Conexión establecida con PostgreSQL");
    });

    this.pool.on("error", (err) => {
      console.error("Error en el pool de PostgreSQL:", err.message);
    });
  }

  // Singleton: siempre devuelve la misma instancia
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Ejecutar queries
  public async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const start = Date.now();
    const res = await this.pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log("Query ejecutada:", { text, duration, rows: res.rowCount });
    return res;
  }

  // Obtener un cliente para transacciones
  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }
}

// Exportar única instancia del DB
const db = Database.getInstance();
export default db;
