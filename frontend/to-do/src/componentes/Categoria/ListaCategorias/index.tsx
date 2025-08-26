"use client";

import { Lista, Item } from "./styled";
import type { IListaCategoriasProps } from "./types";
import Button from "@/componentes/Comunes/Button";

const ListaCategorias = ({
  categorias,
  eliminarCategoria,
}: IListaCategoriasProps) => {
  return (
    <Lista>
      {categorias.map((cat) => (
        <Item key={cat.id}>
          <span>{cat.nombre}</span>
          <Button type="button" onClick={() => eliminarCategoria(cat.id)}>
            Eliminar
          </Button>
        </Item>
      ))}
    </Lista>
  );
};

export default ListaCategorias;
