import { Router } from "express";
import userRouter from "./bank-account/bank-account.router";
import authRouter from "./auth/auth.router";
import transactionRouter from "./transaction/transaction.router";
const router = Router();

router.use("/users", userRouter);
router.use(authRouter);
router.use("/transaction", transactionRouter);

export default router;
