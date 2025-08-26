interface IFormValues {
    nombre: string;
};

interface IFormularioCategoriaProps {
    onSubmit: (nombre: string) => void;
};

export type { IFormularioCategoriaProps, IFormValues };
  