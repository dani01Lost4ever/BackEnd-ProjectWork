import { Schema, model } from "mongoose";
import { TransactionType as iTransactionType } from './transaction-type.entity'

export const TransactionTypeSchema = new Schema<iTransactionType>({
    category: String,
    typology: String,
  });

  export const TransactionTypeModel = model("TransactionType", TransactionTypeSchema);

  const allowedCategories = [
    "Apertura Conto",
    "Bonifico Entrata",
    "Bonifico Uscita",
    "Prelievo Contanti",
    "Pagamento Utenze",
    "Ricarica Cellulare",
    "Versamento Bancomat",
    "Pagamento con Carta",
    "Ricezione Pagamenti"
  ];
  
  allowedCategories.forEach(async (category) => {
    let typology = ""; 
  
    if (category === "Prelievo contanti" || category === "Bonifico Uscita" || category === "Pagamento Utenze" || category === "Ricarica cellulare" || category === "Pagamento con Carta") {
      typology = "Uscita";
    } else if (category === "Bonifico Entrata" || category === "Apertura Conto" || category === "Versamento Bancomat" || category === "Ricezione Pagamenti") {
      typology = "Entrata";
    }
  
    const transactionType = new TransactionTypeModel({
      category,
      typology,
    });
  
    try {
      await transactionType.save();
      console.log(`Documento per ${category} creato con successo.`);
    } catch (error) {
      console.error(`Errore durante la creazione del documento per ${category}:`, error);
    }
  });