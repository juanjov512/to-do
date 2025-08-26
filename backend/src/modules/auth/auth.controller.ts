import { Request, Response, NextFunction } from "express";
import * as service from "./auth.service";

async function registro(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await service.registro(req.body);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await service.login(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

async function perfil(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const data = await service.perfil(req.user as any);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export { registro, login, perfil }
