import mongoose, { Schema, model } from "mongoose";
import { TransactionType as iTransactionType } from './transaction-type.entity'

export const TransactionTypeSchema = new Schema<iTransactionType>({
    category: String,
    typology: String,

  });

TransactionTypeSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      return ret;
    }
  });

export const TransactionType = mongoose.model<iTransactionType>('TransactionType', TransactionTypeSchema)
