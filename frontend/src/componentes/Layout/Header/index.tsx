import React from "react";
import { HeaderContainer, HeaderTitle, HeaderActions } from "./styled";
import Button from "@/componentes/Comunes/Button";
import ToggleButton from "../ToggleButton";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const { logout, usuario } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <HeaderTitle>📝 Todo App</HeaderTitle>
      <HeaderActions>
        <span>Hola, {usuario?.nombre || "Usuario"}</span>
        <ToggleButton />
        <Button onClick={handleLogout} type="button">
          Cerrar Sesión
        </Button>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;
