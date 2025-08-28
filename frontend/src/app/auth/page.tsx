"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginContainer,
  LoginCard,
  LoginTabs,
  TabButton,
  TabContent,
} from "./styled";
import { FormularioLogin } from "@/componentes/Auth/FormularioLogin";
import { FormularioRegistro } from "@/componentes/Auth/FormularioRegistro";

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "registro">("login");
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/tareas");
  };

  const handleRegistroSuccess = () => {
    setActiveTab("login");
  };

  return (
    <LoginContainer>
      <LoginCard>
        <h1>📝 Todo App</h1>
        <p>Organiza tus tareas de manera eficiente</p>

        <LoginTabs>
          <TabButton
            $active={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            Iniciar Sesión
          </TabButton>
          <TabButton
            $active={activeTab === "registro"}
            onClick={() => setActiveTab("registro")}
          >
            Registrarse
          </TabButton>
        </LoginTabs>

        <TabContent>
          {activeTab === "login" ? (
            <FormularioLogin onSuccess={handleLoginSuccess} />
          ) : (
            <FormularioRegistro onSuccess={handleRegistroSuccess} />
          )}
        </TabContent>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
