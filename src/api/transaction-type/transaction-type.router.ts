import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import {
  listTransactionsType,
  getTransactionById,
  addTransactiontype,
} from "./transaction-type.controller";
import { QueryTransactionTypeDTO } from "./transaction-type.dto";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  validate(QueryTransactionTypeDTO, "body"),
  addTransactiontype
);
router.get("/", listTransactionsType);
router.get("/:id", getTransactionById);

export default router;
