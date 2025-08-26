import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as repo from "./auth.repository";
import { IRegistroDTO, ILoginDTO, IUsuario } from "./auth.types";
import { config } from "../../config/env";

const JWT_SECRET = config.jwtSecret;
const JWT_EXPIRES_IN = "1h";
const SALT_ROUNDS = 10;

async function registro(dto: IRegistroDTO): Promise<string> {
  const existe = await repo.findByEmail(dto.email);
  if (existe) {
    throw { status: 400, message: "El email ya está registrado" };
  }

  const hash = await bcrypt.hash(dto.password, SALT_ROUNDS);
  const user = await repo.createUser(dto.nombre, dto.email, hash);

  return generarToken(user);
}

async function login(dto: ILoginDTO): Promise<string> {
  const user = await repo.findByEmail(dto.email);
  if (!user) {
    throw { status: 400, message: "Credenciales inválidas" };
  }

  const match = await bcrypt.compare(dto.password, user.password_hash);
  if (!match) {
    throw { status: 400, message: "Credenciales inválidas" };
  }

  return generarToken(user);
}

async function perfil(user: IUsuario) {
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    created_at: user.created_at,
  };
}

function generarToken(user: IUsuario): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export { registro, login, perfil }
