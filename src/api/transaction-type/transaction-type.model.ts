import { Schema } from "mongoose";
import { TransactionType as iTransactionType } from './transaction-type.entity'

export const TransactionTypeSchema = new Schema<iTransactionType>({
    category: String,
    typology: String,
  });

  /* export const transactionCategories: iTransactionType[] = [
    {
      category: "Apertura Conto",
      typology: "Entrata", 
    },
    {
      category: "Bonifico Entrata",
      typology: "Entrata",
    },
    {
      category: "Bonifico Uscita",
      typology: "Uscita",
    },
    {
      category: "Prelievo contanti",
      typology: "Uscita",
    },
    {
      category: "Pagamento Utenze",
      typology: "Uscita",
    },
    {
      category: "Ricarica",
      typology: "Entrata", 
    },
    {
      category: "Versamento Bancomat",
      typology: "Entrata",
    },
   ];*/