import { Error } from "mongoose";
import { TransactionType } from "../transaction-type/transaction-type.model";
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

          const tempBalance = await this.calcBalance(lastTransaction, transaction);

          const newTransaction = new TransactionModel({
            bankaccountid: transaction.bankaccountid,
            date: transaction.date,
            amount: transaction.amount,
            balance: tempBalance,
            categoryid: transaction.categoryid,
            description: transaction.description,
          });

          const result = await newTransaction.save();

          return result;
        } catch (error) {
          throw error;
        }
      }

      async calcBalance(lastTransaction, transaction):Promise<number> {
        try {
          const transactionDoc = await TransactionType.findById(transaction.categoryid);
      
          if (!transactionDoc) {
            throw new Error("category non trovata o sbagliata");
          }
      
          const transactionTypeId = transactionDoc.id;
          const typo = await TransactionType.findById(transactionTypeId);
      
          if (!typo) {
            throw new Error("no type");
          }

          const typology = typo.typology;
          if(typology == 'Entrata'){
            lastTransaction.balance = lastTransaction ? lastTransaction.balance + transaction.amount : transaction.amount;
          }
          else{
            if(typology == 'Uscita' && lastTransaction.balance < transaction.amount){
              console.error('Saldo insufficiente');
              throw new Error("Saldo Insufficiente")
              //da gestire l'errore nella cartella errori
            }
            else{
              lastTransaction.balance = lastTransaction ? lastTransaction.balance - transaction.amount : transaction.amount;
            }
          }
      
          return lastTransaction.balance;
        } catch (error) {
          console.error('Errore:', error);
          throw error;
        }
      }

  
  }


export default new TransictionService();
