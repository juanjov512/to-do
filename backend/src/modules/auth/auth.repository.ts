import db from "../../config/db";
import { IUsuario } from "./auth.types";

async function findByEmail(email: string): Promise<IUsuario | null> {
  const { rows } = await db.query<IUsuario>(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return rows[0] || null;
}

async function createUser(
  nombre: string,
  email: string,
  password_hash: string
): Promise<IUsuario> {
  const { rows } = await db.query<IUsuario>(
    `INSERT INTO usuarios (nombre, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, email, password_hash]
  );
  return rows[0];
}

export { findByEmail, createUser }
