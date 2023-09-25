import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { TransictionDTO, getLastTransacDTO } from "./transaction.dto";
import { transaction as TransactionModel } from "./transiction.model";
import TransictionService from "./transiction.service";
import { BankAccount } from "../bank-account/bank-account.model";

export const transaction = async (
  req: TypedRequest<TransictionDTO, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new BankAccount(req.user!);
    const transaction = new TransactionModel({
      bankaccountid: user.id,
      date: new Date(),
      iban: req.body.iban,
      amount: req.body.amount,
      categoryid: req.body.categoryid,
      description: req.body.description,
    });
    const transactionCompleted = await TransictionService.newTransiction(
      transaction
    );
    res.json(transactionCompleted);
  } catch (err: any) {
    next(err);
  }
};

export const getTransactions = async (
  req: TypedRequest<any, any, getLastTransacDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new BankAccount(req.user!);
    const nTransac = req.params.num;
    const list = await TransictionService.getTransactions(
      user.id || "",
      nTransac
    );
    res.json(list);
  } catch (err: any) {
    next(err);
  }
};
