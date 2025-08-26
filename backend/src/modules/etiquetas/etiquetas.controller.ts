import { Request, Response, NextFunction } from "express"
import * as service from "./etiquetas.service"

async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    const etiquetas = await service.listar(req.user!.id)
    res.json(etiquetas)
  } catch (err) {
    next(err)
  }
}

async function crear(req: Request, res: Response, next: NextFunction) {
  try {
    const etiqueta = await service.crear(req.user!.id, req.body)
    res.status(201).json(etiqueta)
  } catch (err) {
    next(err)
  }
}

export { listar, crear }
