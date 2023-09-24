import { NextFunction, Response, Request } from "express";
import BankAccountService from "./bank-account.service";
import { BankAccount } from "./bank-account.model";
import { AdminPrivilegesRequired } from "../../errors/user-errors";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user!);
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new BankAccount(req.user!);
    if ((user.id! = process.env.ADMIN_ID)) {
      throw new AdminPrivilegesRequired();
    }
    const list = await BankAccountService.list();
    res.json(list);
  } catch (err: any) {
    next(err);
  }
};
