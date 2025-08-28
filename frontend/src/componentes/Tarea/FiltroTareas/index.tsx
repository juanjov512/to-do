import { IFiltroTareasProps } from "./types";
import { FiltroContainer } from "./styled";
import Input from "@/componentes/Comunes/Input";
import Grupos from "./Grupos";
import { useState, useEffect } from "react";
import Button from "@/componentes/Comunes/Button";
import Modal from "@/componentes/Comunes/Modal";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FiltroTareas: React.FC<IFiltroTareasProps> = ({
  filtros,
  onFiltrosChange,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busquedaLocal, setBusquedaLocal] = useState(filtros.busqueda || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      onFiltrosChange({ ...filtros, busqueda: busquedaLocal });
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busquedaLocal]);

  const handleFiltroChange = (
    campo: keyof IFiltroTareasProps["filtros"],
    valor: IFiltroTareasProps["filtros"][keyof IFiltroTareasProps["filtros"]]
  ) => {
    if (campo === "busqueda") {
      setBusquedaLocal(valor as string);
    } else {
      onFiltrosChange({ ...filtros, [campo]: valor });
    }
  };

  const handleLimpiarFiltros = () => {
    setBusquedaLocal("");
    onFiltrosChange({ busqueda: "" });
  };

  return (
    <FiltroContainer>
      <Input
        placeholder="Buscar..."
        value={busquedaLocal}
        onChange={(e) => handleFiltroChange("busqueda", e.target.value)}
      />
      <div>
        <Button onClick={() => setMostrarModal(true)} variant="secondary">
          Filtrar&nbsp;
          <FontAwesomeIcon icon={faSliders} />
        </Button>
      </div>

      <Modal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        title="Filtros"
        footer={<Button onClick={handleLimpiarFiltros}>Limpiar</Button>}
      >
        <Grupos filtros={filtros} handleFiltroChange={handleFiltroChange} />
      </Modal>
    </FiltroContainer>
  );
};

export default FiltroTareas;
