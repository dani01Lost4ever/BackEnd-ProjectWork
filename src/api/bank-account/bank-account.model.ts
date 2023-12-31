import { Schema, model } from "mongoose";
import { BankAccount as iBankAccount } from "./bank-account.entity";
import { BankAccountService } from "./bank-account.service";
import TransictionService from "../transaction/transiction.service";
export const BankAccountSchema = new Schema<iBankAccount>({
  firstName: String,
  lastName: String,
  picture: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png",
  },
  date: Date,
  iban: String,
});

BankAccountSchema.pre("save", function (next: any) {
  if (this.isNew) {
    this.date = new Date();
  }
  next();
});

BankAccountSchema.pre("save", function (next: any) {
  if (this.isNew) {
    this.iban = BankAccountService.generateIBAN();
  }
  next();
});

BankAccountSchema.pre("save", function (next: any) {
  if (this.isNew) {
    TransictionService.newBankAccout(this.id);
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
