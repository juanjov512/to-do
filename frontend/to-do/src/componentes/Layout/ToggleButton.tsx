// ejemplo en un botón
import { useTheme } from "@/contexto/ThemeContext";

export default function ToggleButton() {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
}
