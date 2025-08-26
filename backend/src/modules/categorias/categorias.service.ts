import * as repo from "./categorias.repository"
import type { ICategoria, ICrearCategoriaDTO, IActualizarCategoriaDTO } from "./categorias.types"

async function listar(userId: number): Promise<ICategoria[]> {
  return await repo.getAll(userId)
}

async function crear(userId: number, dto: ICrearCategoriaDTO): Promise<ICategoria> {
  return await repo.create(userId, dto.nombre)
}

async function actualizar(userId: number, id: number, dto: IActualizarCategoriaDTO): Promise<ICategoria | null> {
  if (!dto.nombre) return null
  return await repo.update(userId, id, dto.nombre)
}

async function eliminar(userId: number, id: number): Promise<boolean> {
  return await repo.remove(userId, id)
}

export { listar, crear, actualizar, eliminar }
