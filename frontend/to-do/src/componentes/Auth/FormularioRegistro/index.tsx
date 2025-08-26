"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";
import { IRegistroDTO } from "@/types";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { registroSchema } from "@/validations/auth";

export const FormularioRegistro = () => {
  const { register: registrarUsuario } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegistroDTO>({
    resolver: yupResolver(registroSchema),
  });

  const onSubmit = async (data: IRegistroDTO) => {
    try {
      await registrarUsuario(data);
      // aquí podrías redirigir al dashboard o mostrar mensaje
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Input
        label="Nombre"
        {...register("nombre")}
        error={errors.nombre?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Contraseña"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Registrarse"}
      </Button>
    </form>
  );
};
