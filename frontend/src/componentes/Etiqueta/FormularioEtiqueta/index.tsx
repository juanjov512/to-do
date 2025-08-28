"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { etiquetaSchema } from "@/validations/etiqueta";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { Form } from "./styled";
import type { IFormularioEtiquetaProps } from "./types";
import { useEtiquetas } from "@/hooks/useEtiquetas";
import { ICrearEtiquetaDTO } from "@/types";
import { useError } from "@/contexto/ErrorProvider";

const FormularioEtiqueta = ({ onSuccess }: IFormularioEtiquetaProps) => {
  const { agregarEtiqueta } = useEtiquetas();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICrearEtiquetaDTO>({
    resolver: yupResolver(etiquetaSchema),
  });
  const { showError } = useError();

  const submit = async (data: ICrearEtiquetaDTO) => {
    try {
      await agregarEtiqueta(data);
      onSuccess();
      reset();
    } catch (err) {
      showError("Error al agregar etiqueta" + err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Input
        label="Nombre"
        {...register("nombre")}
        error={errors.nombre?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Agregar"}
      </Button>
    </Form>
  );
};

export default FormularioEtiqueta;
