"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";
import { IRegistroDTO } from "@/types";
import Input from "@/componentes/Comunes/Input";
import Button from "@/componentes/Comunes/Button";
import { registroSchema } from "@/validations/auth";
import { useError } from "@/contexto/ErrorProvider";

interface FormularioRegistroProps {
  onSuccess: () => void;
}

export const FormularioRegistro = ({ onSuccess }: FormularioRegistroProps) => {
  const { register: registrarUsuario } = useAuth();
  const { showError } = useError();

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
      onSuccess();
    } catch (err) {
      showError("Error al registrar" + err);
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
