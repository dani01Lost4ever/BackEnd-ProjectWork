import { TransactionType } from "../transaction-type/transaction-type.model";
import { transaction } from "./transaction.entity";
import { transaction as TransactionModel } from "./transaction.model";
import {
  BankTransactionFailed,
  CategoryNotFound,
  GeneralTransactionError,
  IBANNotFound,
  InitializeNewAccoutFailed,
  InsufficientBalance,
  InternalTypeError,
  InvalidPhoneCredit,
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
  async getUserByIban(iban: string | undefined): Promise<BankAccount | null> {
    const result = await BankAccoutModel.findOne({ iban: iban });
    return result;
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
  //Memorizzare in una Tabella  l’indirizzo IP, data/ora e se l’operazione è andata a buon fine o meno.
  async newTransiction(transaction: Partial<transaction>) {
    let lastTransaction;
    let userOutgoing;
    console.log(transaction.bankaccountid);

    lastTransaction = await this.getLast(transaction.bankaccountid!.toString());
    userOutgoing = await this.getUserByIban(transaction.iban);

    if (transaction.categoryid?.toString() == "650d866cff8d876d587ff46a") {
      if (
        transaction.amount != 5 &&
        transaction.amount != 10 &&
        transaction.amount != 20 &&
        transaction.amount != 50 &&
        transaction.amount != 100
      ) {
        throw new InvalidPhoneCredit();
      }
    }

    let tempBalance = await this.calcBalance(lastTransaction, transaction);

    try {
      const newTransaction = new TransactionModel({
        bankaccountid: transaction.bankaccountid,
        date: transaction.date,
        amount: transaction.amount,
        balance: tempBalance,
        categoryid: transaction.categoryid?.toString(),
        description: transaction.description,
      });

      const result = await newTransaction.save();

      if (
        result &&
        transaction.categoryid?.toString() == "650d854dde65f59e517de0c5"
      ) {
        if (userOutgoing == null) {
          throw new IBANNotFound();
        }
        //id bonifico in entrata
        try {
          const call = await this.getUserById(
            transaction.bankaccountid?.toString() || ""
          );
          const userIncoming = new BankAccoutModel(call);
          if (userOutgoing) {
            const temp = new TransactionModel({
              bankaccountid: userOutgoing.id,
              amount: transaction.amount,
              categoryid: "650d851061520f73182c26ed", //id bonifico in uscita
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
      throw new GeneralTransactionError();
    }
  }

  async calcBalance(lastTransaction, transaction): Promise<number> {
    const transactionDoc = await TransactionType.findById(
      transaction.categoryid
    );

    if (!transactionDoc) {
      throw new CategoryNotFound();
    }

    const transactionTypeId = transactionDoc._id;
    //typo sarebbe Entrate o Uscite
    const typo = await TransactionType.findById(transactionTypeId);

    if (!typo) {
      throw new InternalTypeError();
    }

    const typology = typo.typology;
    if (typology == "Entrata") {
      if (lastTransaction?.balance == null) {
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
  }

  async getTransactions(
    bankaccountId: string,
    limit: number = 5,
    categoryId?: string,
    startDate?: Date,
    endDate?: Date
  ) {
    try {
      if (bankaccountId == null || bankaccountId == undefined) {
        throw new IBANNotFound();
      }
      if (
        categoryId != undefined &&
        startDate == undefined &&
        endDate == undefined
      ) {
        const transactions = await TransactionModel.find({
          categoryid: categoryId,
          bankaccountid: bankaccountId,
        })
          .sort({ date: -1 })
          .limit(limit)
          .select("-bankaccountid")
          .populate("categoryid", "category typology")
          .exec();
        return { transactions };
      } else if (
        categoryId == undefined &&
        startDate != undefined &&
        endDate != undefined
      ) {
        const transactions = await TransactionModel.find({
          bankaccountid: bankaccountId,
          date: { $gte: new Date(startDate), $lt: new Date(endDate) },
        })

          .sort({ date: -1 })
          .limit(limit)
          .select("-bankaccountid")
          .populate("categoryid", "category typology")
          .exec();
        return { transactions };
      } else if (
        categoryId != undefined &&
        startDate != undefined &&
        endDate != undefined
      ) {
        const transactions = await TransactionModel.find({
          bankaccountid: bankaccountId,
          date: { $gte: new Date(startDate), $lt: new Date(endDate) },
          categoryid: categoryId,
        })
          .sort({ date: -1 })
          .limit(limit)
          .select("-bankaccountid")
          .populate("categoryid", "category typology")
          .exec();
        return { transactions };
      } else {
        // throw new NoTransactionsFound();
        const transactions = await TransactionModel.find({
          bankaccountid: bankaccountId,
        })
          .sort({ date: -1 })
          .limit(limit)
          .select("-bankaccountid")
          .populate("categoryid", "category typology")
          .exec();

        return { transactions };
      }
    } catch (err) {
      console.error(err);
      throw new GeneralTransactionError();
    }
  }
}

export default new TransictionService();
