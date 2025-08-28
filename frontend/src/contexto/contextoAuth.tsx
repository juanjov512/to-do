"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { ILoginDTO, IRegistroDTO } from "@/types";
import {
  login as loginService,
  registro as registroService,
  perfil as perfilService,
} from "@/servicios/auth";
import router from "next/router";

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
  login: (data: ILoginDTO) => Promise<IUsuario>;
  logout: () => void;
  register: (data: IRegistroDTO) => Promise<IUsuario>;
  refrescarPerfil: () => Promise<void>;
}

const defaultUser: IUsuario = {
  id: "",
  nombre: "",
  email: "",
};

const AuthContext = createContext<IAuthContextProps>({
  usuario: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: async () => defaultUser,
  logout: () => {},
  register: async () => defaultUser,
  refrescarPerfil: async () => {},
});

const ContextoAuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [loading, setLoading] = useState(true); // Start with true to check auth state
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("usuario");

        if (token && userData && userData !== "undefined") {
          const parsedUser = JSON.parse(userData);
          if (parsedUser && typeof parsedUser === "object") {
            setUsuario(parsedUser);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: ILoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const { usuario, token } = await loginService(data);
      setUsuario(usuario);
      setIsAuthenticated(true);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);
      return usuario;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: IRegistroDTO) => {
    setLoading(true);
    setError(null);
    try {
      const { usuario, token } = await registroService(data);
      setUsuario(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);
      return usuario;
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
    setIsAuthenticated(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
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
        isAuthenticated,
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
