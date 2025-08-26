"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaSchema } from "@/validations/categoria";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { Form } from "./styled";
import type { IFormularioCategoriaProps, IFormValues } from "./types";

const FormularioCategoria = ({ onSubmit }: IFormularioCategoriaProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormValues>({
    resolver: yupResolver(categoriaSchema),
  });

  const submit = async (data: IFormValues) => {
    await onSubmit(data.nombre);
    reset();
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

export default FormularioCategoria;
