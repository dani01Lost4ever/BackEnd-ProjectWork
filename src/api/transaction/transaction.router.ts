import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { TransictionDTO, getLastTransacDTO } from "./transaction.dto";
import { getTransactions, transaction } from "./transaction.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.post("/", validate(TransictionDTO, "body"), transaction);
router.get("/:num", validate(getLastTransacDTO, "params"), getTransactions);

export default router;
