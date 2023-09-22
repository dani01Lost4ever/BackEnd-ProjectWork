import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { listTransactionsType, getTransactionById } from './transaction-type.controller';
import { QueryTransactionTypeDTO } from "./transaction-type.dto";

const router = Router();

router.post('/', validate(QueryTransactionTypeDTO));
router.get('/', validate(QueryTransactionTypeDTO, 'query'), listTransactionsType);
router.get('/:id', getTransactionById);

export default router;