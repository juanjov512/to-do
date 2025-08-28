import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

const crearTareaSchema = yup.object().shape({
  categoria_id: yup.number()
    .required("La categoría es obligatoria")
    .positive("La categoría debe ser válida"),

  titulo: yup.string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder los 100 caracteres"),

  descripcion: yup.string()
    .optional()
    .max(500, "La descripción no puede exceder los 500 caracteres"),

  prioridad: yup.number()
    .optional()
    .min(1, "La prioridad debe ser al menos 1")
    .max(5, "La prioridad no puede ser mayor a 5"),

  fecha_vencimiento: yup.date()
    .optional()
    .min(today, "La fecha de vencimiento no puede ser en el pasado"),
});

const actualizarTareaSchema = yup.object().shape({
  categoria_id: yup.number()
    .positive("La categoría debe ser válida")
    .optional(),

  titulo: yup.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder los 100 caracteres")
    .optional(),

  descripcion: yup.string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .optional(),

  prioridad: yup.number()
    .min(1, "La prioridad debe ser al menos 1")
    .max(5, "La prioridad no puede ser mayor a 5")
    .optional(),

  fecha_vencimiento: yup.date()
    .min(today, "La fecha de vencimiento no puede ser en el pasado")
    .optional(),

  completada: yup.boolean().optional(),
});

export { crearTareaSchema, actualizarTareaSchema };
