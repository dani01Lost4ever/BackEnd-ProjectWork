import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { listTransactionsType, getTransactionById, addTransactiontype } from './transaction-type.controller';
import { QueryTransactionTypeDTO } from "./transaction-type.dto";

const router = Router();

router.post('/', validate(QueryTransactionTypeDTO, 'body'),addTransactiontype);
router.get('/', validate(QueryTransactionTypeDTO, 'query'), listTransactionsType);
router.get('/:id', getTransactionById);

export default router;