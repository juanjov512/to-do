interface ICrearCategoriaDTO {
    nombre: string
}

interface IActualizarCategoriaDTO {
    nombre?: string
}

interface ICategoria {
    id: number;
    nombre: string;
}

export type { ICategoria, ICrearCategoriaDTO, IActualizarCategoriaDTO }