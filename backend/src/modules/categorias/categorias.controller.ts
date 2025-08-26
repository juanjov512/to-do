import { Request, Response, NextFunction } from "express"
import * as service from "./categorias.service"

async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    const categorias = await service.listar(req.user!.id)
    res.json(categorias)
  } catch (err) {
    next(err)
  }
}

async function crear(req: Request, res: Response, next: NextFunction) {
  try {
    const categoria = await service.crear(req.user!.id, req.body)
    res.status(201).json(categoria)
  } catch (err) {
    next(err)
  }
}

async function actualizar(req: Request, res: Response, next: NextFunction) {
  try {
    const categoria = await service.actualizar(req.user!.id, Number(req.params.id), req.body)
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" })
    res.json(categoria)
  } catch (err) {
    next(err)
  }
}

async function eliminar(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await service.eliminar(req.user!.id, Number(req.params.id))
    if (!ok) return res.status(404).json({ message: "Categoría no encontrada" })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export { listar, crear, actualizar, eliminar }
