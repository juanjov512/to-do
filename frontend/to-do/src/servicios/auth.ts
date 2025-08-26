import api from "./api";
import type { IRegistroDTO, ILoginDTO } from "@/types";

const registro = async (data: IRegistroDTO) => {
  const res = await api.post("/auth/registro", data);
  return res.data;
};

const login = async (data: ILoginDTO) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

const perfil = async () => {
  const res = await api.get("/auth/perfil");
  return res.data;
};

export { registro, login, perfil };
