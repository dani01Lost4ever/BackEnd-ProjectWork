import { TransactionType } from "./transaction-type.entity";
import { TransactionType as TransactionTypeModel } from "./transaction-type.model";
import { NotFoundError } from "../../errors/not-found";

export class TransactionTypeService {
  async find(): Promise<TransactionType[]> {
    const list = await TransactionTypeModel.find({});
    return list;
  }

  async getById(id: string): Promise<TransactionType | null> {
    const item = await TransactionTypeModel.findById(id);
    if (item == null) {
      throw new NotFoundError();
    }
    return item;
  }

  async create(transactionData): Promise<TransactionType> {
    const newTransactionType = new TransactionTypeModel(transactionData);
    const createdTransactionType = await newTransactionType.save();
    return createdTransactionType;
  }
}

//???
// async find(query: QueryTransactionTypeDTO): Promise<TransactionType[]> {
//   const q: FilterQuery<TransactionType> = {};
//   if (query.category) {
//     q.category = { $regex: new RegExp(`^${query.category}`, "i") };
//   }
//   if (query.typology) {
//     q.typology = { $regex: new RegExp(`^${query.typology}`, "i") };
//   }

//   const limit = 100;
//   const list = await TransactionTypeModel.find(q).limit(limit);
//   return list;
// }
export default new TransactionTypeService();
