import { BankAccount as BankAccountModel } from "./bank-account.model";
import { BankAccountIdentity as BankAccountIdentityModel } from "../../utils/auth/local/bank-account-identity.model";
import { BankAccount } from "./bank-account.entity";
import * as bcrypt from "bcrypt";
import { BankAccountExistsError } from "../../errors/bank-account-exist";

export class BankAccountService {
  async add(
    user: BankAccount,
    credentials: { username: string; password: string }
  ): Promise<BankAccount> {
    const existingIdentity = await BankAccountIdentityModel.findOne({
      "credentials.username": credentials.username,
    });
    if (existingIdentity) {
      throw new BankAccountExistsError();
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
}
export default new BankAccountService();
