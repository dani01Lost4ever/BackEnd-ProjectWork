import { TransactionType } from "../transaction-type/transaction-type.model";
import { transaction } from "./transaction.entity";
import { transaction as TransactionModel } from "./transiction.model";
import {
  BalanceCalculationError,
  BankTransactionFailed,
  CategoryNotFound,
  GenneralTransactionError,
  InitializeNewAccoutFailed,
  InsufficientBalance,
  InternalTypeError,
} from "../../errors/transaction-errors";
import { BankAccount } from "../bank-account/bank-account.entity";
import { BankAccount as BankAccoutModel } from "../bank-account/bank-account.model";

export class TransictionService {
  async getLast(bankaccountid: string): Promise<transaction | null> {
    const result = await TransactionModel.findOne({
      bankaccountid: bankaccountid,
    }).sort({ date: -1 });
    return result;
  }
  async getById(id: string): Promise<transaction | null> {
    return await TransactionModel.findById(id);
  }
  async getUserById(id: string): Promise<BankAccount | null> {
    return await BankAccoutModel.findById(id);
  }
  async getUserByIban(iban: string): Promise<BankAccount | null> {
    return await BankAccoutModel.findOne({ iban: iban });
  }

  async newBankAccout(id: string) {
    const newTransaction = new TransactionModel({
      bankaccountid: id,
      date: new Date(),
      amount: 0,
      balance: 0,
      categoryid: "650e0b0568e6dd183671f36d",
      description: "---Account Initialization---",
    });

    try {
      return await newTransaction.save();
    } catch (err) {
      console.error(err);
      throw new InitializeNewAccoutFailed();
    }
  }
  //
  async newTransiction(transaction: Partial<transaction>) {
    console.log(transaction.bankaccountid);
    try {
      const lastTransaction = await this.getLast(
        transaction.bankaccountid!.toString()
      );

      let tempBalance = await this.calcBalance(lastTransaction, transaction);

      const newTransaction = new TransactionModel({
        bankaccountid: transaction.bankaccountid,
        date: transaction.date,
        amount: transaction.amount,
        balance: tempBalance,
        categoryid: transaction.categoryid,
        description: transaction.description,
      });

      const result = await newTransaction.save();

      if (result && transaction.categoryid == "650d854dde65f59e517de0c5") {
        try {
          const call = await this.getUserById(
            transaction.bankaccountid?.toString() || ""
          );
          const userIncoming = new BankAccoutModel(call);
          const userOutgoing = new BankAccoutModel(
            await this.getUserByIban(transaction.iban || "")
          );
          if (userOutgoing) {
            const temp = new TransactionModel({
              bankaccountid: userOutgoing.id,
              amount: transaction.amount,
              categoryid: "650d851061520f73182c26ed",
              description:
                "Incoming bank transaction from " + userIncoming.iban,
            });
            this.newTransiction(temp);
          }
        } catch (err) {
          console.error(err);
          throw new BankTransactionFailed();
        }
      }

      return await this.getById(result._id.toString());
    } catch (err) {
      console.log(err);
      throw new GenneralTransactionError();
    }
  }

  async calcBalance(lastTransaction, transaction): Promise<number> {
    try {
      const transactionDoc = await TransactionType.findById(
        transaction.categoryid
      );

      if (!transactionDoc) {
        throw new CategoryNotFound();
      }

      const transactionTypeId = transactionDoc._id;
      const typo = await TransactionType.findById(transactionTypeId);

      if (!typo) {
        throw new InternalTypeError();
      }

      const typology = typo.typology;
      if (typology == "Entrata") {
        if (lastTransaction.balance == null) {
          lastTransaction = { balance: transaction.amount };
        } else {
          lastTransaction.balance = lastTransaction
            ? lastTransaction.balance + transaction.amount
            : transaction.amount;
        }
      } else {
        if (
          typology == "Uscita" &&
          lastTransaction.balance < transaction.amount
        ) {
          throw new InsufficientBalance();
        } else {
          lastTransaction.balance = lastTransaction
            ? lastTransaction.balance - transaction.amount
            : transaction.amount;
        }
      }

      return lastTransaction.balance;
    } catch (err) {
      console.error(err);
      throw new BalanceCalculationError();
    }
  }
}

export default new TransictionService();
