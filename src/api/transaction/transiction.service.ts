import { transaction } from "./transaction.entity";
import { transaction as TransactionModel } from "./transiction.model";

export class TransictionService {
  async getLast(bankaccountid: string): Promise<transaction | null> {
    try {
      const result = await TransactionModel.findOne({
        bankaccountid: bankaccountid,
      }).sort({ date: -1 });

      return result ? result : null;
    } catch (error) {
      throw error;
    }
  }

  async newBankAccout(id: string) {
    const newTransaction = new TransactionModel({
      bankaccountid: id,
      amount: 0,
      balance: 0,
      categoryid: "New Accout",
      description: "First Transaction",
    });

    try {
      return await newTransaction.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async newTransiction(transaction: Partial<transaction>) {
    console.log(transaction.bankaccountid);
    try {
      const lastTransaction = await this.getLast(
        transaction.bankaccountid!.toString()
      );

      const newTransaction = new TransactionModel({
        ...transaction,
        balance: lastTransaction
          ? lastTransaction.balance! + transaction.amount!
          : transaction.amount,
      });

      const result = await newTransaction.save();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default new TransictionService();
