import api from "./api";
import type { IRegistroDTO, ILoginDTO } from "@/types";

interface IUsuario {
  id: string;
  nombre: string;
  email: string;
}

interface IAuthResponse {
  usuario: IUsuario;
  token: string;
}

const setAuthToken = (token: string) => {
  // Guardar en localStorage para acceso del lado del cliente
  localStorage.setItem("token", token);
  
  // Configurar la cookie para el servidor
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 semana de duración
};

const registro = async (data: IRegistroDTO): Promise<IAuthResponse> => {
  const res = await api.post("/auth/registro", data);
  if (res.data.token) {
    setAuthToken(res.data.token);
  }
  return res.data;
};

const login = async (data: ILoginDTO): Promise<IAuthResponse> => {
  const res = await api.post("/auth/login", data);
  if (res.data.token) {
    setAuthToken(res.data.token);
  }
  return res.data;
};

const perfil = async () => {
  const res = await api.get("/auth/perfil");
  return res.data;
};

const logout = () => {
  // Eliminar de localStorage
  localStorage.removeItem("token");
  // Eliminar cookie
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export { registro, login, perfil, logout };
