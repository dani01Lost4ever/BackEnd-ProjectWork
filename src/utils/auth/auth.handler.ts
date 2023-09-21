import "./local/local-strategy";
import "./jwt/jwt-strategy";
import { BankAccount as iBankAccount } from "../../api/bank-account/bank-account.entity";

declare global {
  namespace Express {
    interface BankAccount extends iBankAccount {}
  }
}
