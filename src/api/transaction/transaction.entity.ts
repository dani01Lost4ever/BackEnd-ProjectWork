import { Types } from "mongoose";
import { TransactionType } from "../transaction-type/transaction-type.entity";

export interface transaction {
  id?: string;
  bankaccountid?: Types.ObjectId;
  date?: Date;
  amount: number;
  balance?: number;
  categoryid?: Types.ObjectId;
  description: string;
  iban?: string;
}
