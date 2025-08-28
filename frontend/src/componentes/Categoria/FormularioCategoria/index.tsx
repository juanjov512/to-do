"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaSchema } from "@/validations/categoria";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { Form } from "./styled";
import type { IFormularioCategoriaProps } from "./types";
import { useCategorias } from "@/hooks/useCategorias";
import { ICrearCategoriaDTO } from "@/types";
import { useError } from "@/contexto/ErrorProvider";

const FormularioCategoria = ({ onSuccess }: IFormularioCategoriaProps) => {
  const { agregarCategoria } = useCategorias();
  const { showError } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICrearCategoriaDTO>({
    resolver: yupResolver(categoriaSchema),
  });

  const submit = async (data: ICrearCategoriaDTO) => {
    try {
      await agregarCategoria(data);
      onSuccess();
      reset();
    } catch (err) {
      showError("Error al agregar categoría" + err);
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

export default FormularioCategoria;
