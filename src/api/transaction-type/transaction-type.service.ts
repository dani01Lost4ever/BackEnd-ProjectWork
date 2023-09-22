import { TransactionType } from './transaction-type.entity';
import { TransactionType as TransactionTypeModel } from './transaction-type.model';
import { FilterQuery } from 'mongoose';
import { QueryTransactionTypeDTO } from './transaction-type.dto'; 

export class TransactionTypeService {

  async find(query: QueryTransactionTypeDTO): Promise<TransactionType[]> {
    const q: FilterQuery<TransactionType> = {};
    if (query.category) {
      q.category = {$regex: new RegExp(`^${query.category}`, 'i')};
    }
    if (query.typology) {
      q.typology = {$regex: new RegExp(`^${query.typology}`, 'i')};
    }

    const limit = 100; 
    const list = await TransactionTypeModel.find(q).limit(limit);
    return list; 
  }

  async getById(id: string): Promise<TransactionType | null> {
    const item = await TransactionTypeModel.findById(id);
    return item;
  }

  async create(transactionData: QueryTransactionTypeDTO): Promise<TransactionType> {
    
    const newTransactionType = new TransactionTypeModel(transactionData);
    const createdTransactionType = await newTransactionType.save();
  
    return createdTransactionType;
  }
}

export default new TransactionTypeService();
