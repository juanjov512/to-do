import React from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import SelectComponent from "@/componentes/Comunes/Select";
import { crearTareaSchema } from "@/validations/tareas";
import { FormWrapper } from "./styled";
import { useCategorias } from "@/hooks/useCategorias";
import type { IFormValues } from "./types";
import { faFlag, faTag } from "@fortawesome/free-solid-svg-icons";
import { ITarea } from "@/types";
import { useError } from "@/contexto/ErrorProvider";

interface IProps {
  onSubmit: (data: IFormValues) => void;
  tareaSeleccionada?: ITarea | null;
}

export const PRIORIDADES = [
  {
    label: "Prioridad 1",
    value: "1",
    prefix: { icon: faFlag, color: "#FFEAC2" },
  },
  {
    label: "Prioridad 2",
    value: "2",
    prefix: { icon: faFlag, color: "#FFBD52" },
  },
  {
    label: "Prioridad 3",
    value: "3",
    prefix: { icon: faFlag, color: "#FF9614" },
  },
  {
    label: "Prioridad 4",
    value: "4",
    prefix: { icon: faFlag, color: "#ef4444" },
  },
  {
    label: "Prioridad 5",
    value: "5",
    prefix: { icon: faFlag, color: "#b91c1c" },
  },
];

const Formulario: React.FC<IProps> = ({ onSubmit, tareaSeleccionada }) => {
  const { categorias } = useCategorias();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormValues>({
    resolver: yupResolver(crearTareaSchema) as Resolver<IFormValues>,
    defaultValues: {
      titulo: tareaSeleccionada?.titulo || "",
      descripcion: tareaSeleccionada?.descripcion || "",
      categoria_id: tareaSeleccionada?.categoria_id || undefined,
      prioridad: tareaSeleccionada?.prioridad || undefined,
      fecha_vencimiento: tareaSeleccionada?.fecha_vencimiento || undefined,
    },
  });
  const { showError } = useError();

  const onSubmitForm = async (data: IFormValues) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      showError("Error al crear tarea" + err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label="Título"
        {...register("titulo")}
        error={errors.titulo?.message}
      />
      <Input
        label="Descripción"
        {...register("descripcion")}
        error={errors.descripcion?.message}
      />

      <Controller
        name="categoria_id"
        control={control}
        render={({ field }) => (
          <SelectComponent
            id="categoria_id"
            value={field.value?.toString()}
            onChange={field.onChange}
            options={categorias.map((categoria) => ({
              value: categoria.id.toString(),
              label: categoria.nombre,
              prefix: {
                icon: faTag,
                color: "#6B7280",
              },
            }))}
            placeholder="Selecciona una categoría"
          />
        )}
      />

      <Controller
        name="prioridad"
        control={control}
        render={({ field }) => (
          <SelectComponent
            value={field.value?.toString() || ""}
            id="prioridad"
            onChange={field.onChange}
            options={PRIORIDADES}
            placeholder="Selecciona una prioridad"
          />
        )}
      />

      <Input
        label="Fecha de vencimiento"
        type="date"
        {...register("fecha_vencimiento")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {tareaSeleccionada ? "Editar Tarea" : "Crear Tarea"}
      </Button>
    </FormWrapper>
  );
};

export default Formulario;
