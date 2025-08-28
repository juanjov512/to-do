import * as yup from "yup";

export const etiquetaSchema = yup.object({
  nombre: yup.string().required("El nombre de la etiqueta es obligatorio"),
});