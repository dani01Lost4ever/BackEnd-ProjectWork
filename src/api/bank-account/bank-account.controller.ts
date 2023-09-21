import { NextFunction, Response, Request } from "express";
import BankAccountService from "./bank-account.service";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user!);
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await BankAccountService.list();
  res.json(list);
};
