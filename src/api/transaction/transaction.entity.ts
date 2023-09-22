import { Types } from "mongoose";

export interface transaction {
  id?: string;
  bankaccountid?: Types.ObjectId;
  date?: Date;
  amount: number;
  balance?: number;
  categoryid: Types.ObjectId;
  description: string;
}
