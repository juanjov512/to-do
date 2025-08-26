import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().required("Contraseña requerida"),
});

const registroSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña requerida"),
});

export { loginSchema, registroSchema };
