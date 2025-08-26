interface ICrearTareaDTO {
    categoria_id: number;
    titulo: string;
    descripcion?: string;
    prioridad?: number;
    fecha_vencimiento?: Date;
}

interface IActualizarTareaDTO {
    categoria_id?: number;
    titulo?: string;
    descripcion?: string;
    prioridad?: number;
    fecha_vencimiento?: Date;
    completada?: boolean;
}

interface ITarea extends ICrearTareaDTO {
    id: number;
    completada?: boolean;
}

interface IFiltroTareas {
    categoriaId?: number;
    completada?: boolean;
    prioridad?: number;
    fechaVencimientoDesde?: string;
    fechaVencimientoHasta?: string;
    busqueda?: string;
    ordenarPor?: "created_at" | "updated_at" | "fecha_vencimiento" | "prioridad";
    orden?: "asc" | "desc";
    limite?: number;
    offset?: number;
};

export type { ICrearTareaDTO, IActualizarTareaDTO, ITarea, IFiltroTareas };
