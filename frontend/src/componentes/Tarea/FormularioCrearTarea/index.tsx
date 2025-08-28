import React, { useState } from "react";
import Modal from "@/componentes/Comunes/Modal";
import Formulario from "../Formulario";
import Button from "@/componentes/Comunes/Button";
import { ITarea } from "@/types";
import { useTareas } from "@/hooks/useTareas";
import { useError } from "@/contexto/ErrorProvider";

interface IProps {
  handleOnChange: () => void;
}

const FormularioCrearTarea: React.FC<IProps> = ({ handleOnChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { agregarTarea } = useTareas();
  const { showError } = useError();

  const handleCrearTarea = async (
    tarea: Omit<ITarea, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await agregarTarea(tarea);
      handleOnChange();
      setIsOpen(false);
    } catch (error) {
      showError("Error al crear tarea" + error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Nueva Tarea</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nueva Tarea"
      >
        <Formulario onSubmit={handleCrearTarea} tareaSeleccionada={null} />
      </Modal>
    </>
  );
};

export default FormularioCrearTarea;
