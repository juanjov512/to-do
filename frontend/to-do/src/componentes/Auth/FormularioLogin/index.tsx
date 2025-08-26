"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";
import { ILoginDTO } from "@/types";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { loginSchema } from "@/validations/auth";

export const FormularioLogin = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginDTO>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginDTO) => {
    try {
      await login(data);
      // redirigir o mostrar mensaje
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
        {isSubmitting ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};
