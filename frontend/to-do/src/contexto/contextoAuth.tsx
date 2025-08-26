"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ILoginDTO, IRegistroDTO } from "@/types";
import {
  login as loginService,
  registro as registroService,
  perfil as perfilService,
} from "@/servicios/auth";

interface IUsuario {
  id: string;
  nombre: string;
  email: string;
}

interface IAuthContextProps {
  usuario: IUsuario | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: ILoginDTO) => Promise<void>;
  logout: () => void;
  register: (data: IRegistroDTO) => Promise<void>;
  refrescarPerfil: () => Promise<void>;
}

const AuthContext = createContext<IAuthContextProps>({
  usuario: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  refrescarPerfil: async () => {},
});

const ContextoAuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) setUsuario(JSON.parse(userData));
  }, []);

  const login = async (data: ILoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginService(data);
      setUsuario(res.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.usuario));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: IRegistroDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registroService(data);
      setUsuario(res.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.usuario));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al registrar usuario";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const refrescarPerfil = async () => {
    setLoading(true);
    setError(null);
    try {
      const perfil = await perfilService();
      setUsuario(perfil);
      localStorage.setItem("usuario", JSON.stringify(perfil));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar perfil";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        loading,
        error,
        login,
        logout,
        register,
        refrescarPerfil,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, ContextoAuthProvider };
