import { Router } from "express";
import userRouter from "./bank-account/bank-account.router";
import authRouter from "./auth/auth.router";
const router = Router();

router.use("/users", userRouter);
router.use(authRouter);

export default router;
