"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import MensajeError from "@/componentes/Comunes/MensajeError";

interface ErrorContextType {
  showError: (mensaje: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const showError = useCallback((msg: string) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(null), 3000); // auto-cierra en 3s
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {mensaje &&
        ReactDOM.createPortal(
          <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
            <MensajeError mensaje={mensaje} />
          </div>,
          document.body
        )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("useError must be used inside <ErrorProvider>");
  return context;
};
