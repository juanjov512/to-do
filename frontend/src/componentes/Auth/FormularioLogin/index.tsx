"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";
import { ILoginDTO } from "@/types";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { loginSchema } from "@/validations/auth";
import { useError } from "@/contexto/ErrorProvider";

interface FormularioLoginProps {
  onSuccess: () => void;
}

export const FormularioLogin = ({ onSuccess }: FormularioLoginProps) => {
  const { login } = useAuth();
  const { showError } = useError();

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
      onSuccess();
    } catch (err) {
      showError("Error al iniciar sesión");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        gap: "1.5rem",
        margin: "0 auto",
      }}
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
