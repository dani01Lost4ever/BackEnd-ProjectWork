import mongoose, { Schema, model } from "mongoose";
import { TransactionType as iTransactionType } from "./transaction-type.entity";

export const TransactionTypeSchema = new Schema<iTransactionType>({
  id: String,
  category: String,
  typology: String,
});

TransactionTypeSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = _._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const TransactionType = mongoose.model<iTransactionType>(
  "TransactionType",
  TransactionTypeSchema
);
