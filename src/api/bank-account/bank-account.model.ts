import { Schema, model } from "mongoose";
import { BankAccount as iBankAccount } from "./bank-account.entity";
import { BankAccountService } from "./bank-account.service";
export const BankAccountSchema = new Schema<iBankAccount>({
  firstName: String,
  lastName: String,
  picture: String,
  balance: { type: Number, default: 0 },
  date: Date,
  iban: String,
});

BankAccountSchema.pre("save", function (next: any) {
  if (this.isNew) {
    this.iban = BankAccountService.generateIBAN();
  }
  next();
});

BankAccountSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

BankAccountSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

BankAccountSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const BankAccount = model<iBankAccount>(
  "BankAccount",
  BankAccountSchema
);
