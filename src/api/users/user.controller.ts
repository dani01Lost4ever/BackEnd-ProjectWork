import { NextFunction, Response, Request } from "express";
import UserService from "./user.service";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user!);
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await UserService.list();
  res.json(list);
};
