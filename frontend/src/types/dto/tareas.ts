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

interface IEtiqueta {
    id: number;
    nombre: string;
}

interface ITarea extends ICrearTareaDTO {
    id: number;
    completada?: boolean;
    etiquetas?: IEtiqueta[];
}

interface IFiltroTareas {
    categoria_id?: number;
    completada?: boolean;
    prioridad?: number;
    fecha_vencimiento_desde?: string;
    fecha_vencimiento_hasta?: string;
    busqueda?: string;
    ordenar_por?: "created_at" | "updated_at" | "fecha_vencimiento" | "prioridad";
    orden?: "asc" | "desc";
    limite?: number;
    offset?: number;
};

export type { ICrearTareaDTO, IActualizarTareaDTO, ITarea, IFiltroTareas, IEtiqueta };
