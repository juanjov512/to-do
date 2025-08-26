import * as repo from "./etiquetas.repository"
import type { IEtiqueta, ICrearEtiquetaDTO } from "./etiquetas.types"

async function listar(userId: number): Promise<IEtiqueta[]> {
  return await repo.getAll(userId)
}

async function crear(userId: number, dto: ICrearEtiquetaDTO): Promise<IEtiqueta> {
  return await repo.create(userId, dto.nombre)
}

export { listar, crear }
