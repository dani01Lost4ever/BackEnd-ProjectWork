import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../errors/not-found';
import { TypedRequest } from '../../utils/typed-request.interface';
import TransactionTypeService from './transaction-type.service';
import { QueryTransactionTypeDTO } from './transaction-type.dto'; 

export const addTransactiontype = async (req, res, next) => {
  try {
    const newTransactionTypeData = req.body; 

    const createdTransactionType = await TransactionTypeService.create(newTransactionTypeData);

    res.status(201).json(createdTransactionType);
  } catch (error) {
    next(error);
  }
};

export const listTransactionsType = async (req: TypedRequest<any, QueryTransactionTypeDTO>, res: Response, next: NextFunction) => {
  const transactions = await TransactionTypeService.find(req.query);
  res.json(transactions);
}

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await TransactionTypeService.getById(req.params.id);
  if (!transaction) {
    throw new NotFoundError();
  }
  res.json(transaction);
}
