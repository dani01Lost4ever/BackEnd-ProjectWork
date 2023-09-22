import mongoose, { Schema, model } from "mongoose";
import { BankAccountIdentity as iBankAccount } from "./bank-accout-identity.entity";

export const bankAccountSchema = new mongoose.Schema<iBankAccount>({
  user: { type: Schema.Types.ObjectId, ref: "BankAccount" },
  provider: { type: String, default: "local" },
  credentials: {
    type: {
      username: String,
      hashedPassword: String,
    },
  },
});

bankAccountSchema.pre("findOne", function (next) {
  this.populate("user");
  next();
});

export const BankAccountIdentity = model<iBankAccount>(
  "BankAccountIdentity",
  bankAccountSchema
);
