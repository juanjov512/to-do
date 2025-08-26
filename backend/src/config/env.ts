import dotenv from "dotenv"

dotenv.config()

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const config = {
    dbName: process.env.DB_NAME || "todo_app",
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: parseInt(process.env.DB_PORT || "5432", 10),
    dbUser: process.env.DB_USER || "postgres",
    dbPassword: process.env.DB_PASSWORD || "postgres",
    port: parseInt(process.env.PORT || "3000", 10),
    jwtSecret: requireEnv("JWT_SECRET"),
    nodeEnv: process.env.NODE_ENV || "development",
}
