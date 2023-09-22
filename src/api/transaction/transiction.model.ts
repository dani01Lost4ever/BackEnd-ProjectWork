import { Schema, model } from "mongoose";
import { transaction as iTransaction } from "./transaction.entity";

export const TransactionSchema = new Schema<iTransaction>({
  id: String,
  bankaccountid: String,
  date: Date,
  amount: Number,
  balance: Number,
  categoryid: { type: Schema.Types.ObjectId, ref: "TransactionType" },
  description: String,
  iban: String,
});

TransactionSchema.pre("save", function (next: any) {
  if (this.isNew) {
    this.date = new Date();
  }
  next();
});

TransactionSchema.pre("findOne", function (next) {
  this.populate("categoryid");
  next();
});

TransactionSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

TransactionSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const transaction = model<iTransaction>(
  "transaction",
  TransactionSchema
);
