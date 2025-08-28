import React from "react";
import Modal from "@/componentes/Comunes/Modal";
import Formulario from "../Formulario";
import { ITarea } from "@/types";
import { useTareas } from "@/hooks/useTareas";
import { useError } from "@/contexto/ErrorProvider";

interface IProps {
  tarea: ITarea;
  open: boolean;
  onClose: () => void;
}

const FormularioEditarTarea: React.FC<IProps> = ({ tarea, open, onClose }) => {
  const { actualizarTarea } = useTareas();
  const { showError } = useError();

  const handleActualizarTarea = async (id: number, tarea: Partial<ITarea>) => {
    try {
      await actualizarTarea(id, tarea);
      onClose();
    } catch (error) {
      showError("Error al actualizar tarea" + error);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Editar Tarea">
      <Formulario
        onSubmit={(data) => handleActualizarTarea(tarea.id, data)}
        tareaSeleccionada={tarea}
      />
    </Modal>
  );
};

export default FormularioEditarTarea;
