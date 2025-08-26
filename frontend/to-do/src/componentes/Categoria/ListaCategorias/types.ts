interface ICategoria {
    id: number;
    nombre: string;
}

interface IListaCategoriasProps {
    categorias: ICategoria[];
    eliminarCategoria: (id: number) => void;
}

export type { ICategoria, IListaCategoriasProps };
