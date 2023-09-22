import { BankAccount } from "../../../api/bank-account/bank-account.entity";

export interface BankAccountIdentity {
  id: string;
  provider: string;
  credentials: {
    username: string;
    hashedPassword: string;
  };
  user: BankAccount;
}
