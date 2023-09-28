import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { TransictionDTO, getLastTransacDTO } from "./transaction.dto";
import { transaction as TransactionModel } from "./transaction.model";
import TransictionService from "./transiction.service";
import { BankAccount } from "../bank-account/bank-account.model";
import  LogService  from "../log/log.service";

export const transaction = async (
  req: TypedRequest<TransictionDTO, any, any>,
  res: Response,
  next: NextFunction
) => {
  const user = new BankAccount(req.user!);
  try {
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
    LogService.newLog(
      req.ip,
      new Date(),
      `Transaction done successfully by ${user.id}`
    );
    res.json(transactionCompleted);
  } catch (err: any) {
    LogService.newLog(
      req.ip,
      new Date(),
      `${err.message} by ${user.id}`
    );
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
    const nTransac = req.query;
    const list = await TransictionService.getTransactions(
      user.id || "",
      nTransac.num,
      nTransac.categoryId,
      nTransac.startDate,
      nTransac.endDate
    );
    res.json(list);
  } catch (err: any) {
    next(err);
  }
};
