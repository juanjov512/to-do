import type { QueryResultRow } from "pg";

interface IUsuario extends QueryResultRow {
  id: number;
  nombre: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

interface IRegistroDTO {
  nombre: string;
  email: string;
  password: string;
}

interface ILoginDTO {
  email: string;
  password: string;
}

export type { IUsuario, IRegistroDTO, ILoginDTO }
