import React from "react";
import { ToggleButtonStyled } from "./styled";
import { useTheme } from "@/contexto/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ToggleButton: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <ToggleButtonStyled onClick={toggleTheme}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
    </ToggleButtonStyled>
  );
};

export default ToggleButton;
