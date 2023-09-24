import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import TransactionTypeService from "./transaction-type.service";
import { QueryTransactionTypeDTO } from "./transaction-type.dto";
import { AdminPrivilegesRequired } from "../../errors/user-errors";
import { BankAccount } from "../bank-account/bank-account.model";

export const addTransactiontype = async (
  req: TypedRequest<any, QueryTransactionTypeDTO, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new BankAccount(req.user!);
    if ((user.id! = process.env.ADMIN_ID)) {
      throw new AdminPrivilegesRequired();
    }
    const newTransactionTypeData = req.body;
    const createdTransactionType = await TransactionTypeService.create(
      newTransactionTypeData
    );
    res.status(201).json(createdTransactionType);
  } catch (err) {
    next(err);
  }
};

export const listTransactionsType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions = await TransactionTypeService.find();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transaction = await TransactionTypeService.getById(req.params.id);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};
