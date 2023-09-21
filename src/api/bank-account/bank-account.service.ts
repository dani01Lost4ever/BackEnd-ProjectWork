import { BankAccount as BankAccountModel } from "./bank-account.model";
import { BankAccountIdentity as BankAccountIdentityModel } from "../../utils/auth/local/user-identity.model";
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
}
export default new BankAccountService();
