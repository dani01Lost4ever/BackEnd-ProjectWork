import { BankAccount as BankAccountModel } from "./bank-account.model";
import {
  BankAccountIdentity,
  BankAccountIdentity as BankAccountIdentityModel,
} from "../../utils/auth/local/bank-account-identity.model";
import { BankAccount } from "./bank-account.entity";
import * as bcrypt from "bcrypt";
import {
  BankAccountExistsError,
  PasswordValidationError,
} from "../../errors/bank-account-exist";
import { NotFoundError } from "../../errors/not-found";
import { transaction as TransactionModel } from "../transaction/transaction.model";
import { BalanceCalculationError } from "../../errors/transaction-errors";

export class BankAccountService {
  async add(
    user: BankAccount,
    credentials: {
      username: string;
      password: string;
      confermaPassword: string;
    }
  ): Promise<BankAccount> {
    const existingIdentity = await BankAccountIdentityModel.findOne({
      "credentials.username": credentials.username,
    });
    if (existingIdentity) {
      throw new BankAccountExistsError();
    }
    if (credentials.password != credentials.confermaPassword) {
      throw new PasswordValidationError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const newBankAccount = await BankAccountModel.create(user);
    await BankAccountIdentityModel.create({
      provider: "local",
      user: newBankAccount._id,
      credentials: {
        username: credentials.username,
        hashedPassword,
      },
    });

    return newBankAccount;
  }

  async list() {
    const list = await BankAccountModel.find({});
    return list;
  }

  static generateIBAN() {
    let iban: string[] = ["I", "T"];
    let chars: string[] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    for (let i = 0; i < 27; i++) {
      iban.push(chars[Math.floor(Math.random() * chars.length)]);
    }

    return iban.join("");
  }

  async update(userId: string, newPassword: string, oldPassword: string) {
    try {
      const identity = await BankAccountIdentity.findOne({ user: userId });

      console.log(identity!.toObject().user);

      const match = await bcrypt.compare(
        oldPassword,
        identity!.credentials.hashedPassword
      );

      if (!match) {
        throw new NotFoundError();
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      identity!.credentials.hashedPassword = hashedPassword;
      await identity!.save();

      const updatedUser = await BankAccountIdentity.findOne({ user: userId });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async accountBalance(bankaccountId: string) {
    try {
      const accout = await TransactionModel.find({
        bankaccountid: bankaccountId,
      })
        .sort({ date: -1 })
        .limit(1)
        .select("balance");
      return { accout: accout };
    } catch (error) {
      throw new BalanceCalculationError();
    }
  }
}
export default new BankAccountService();
