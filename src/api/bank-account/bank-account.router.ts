import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { getBalance, list, me } from "./bank-account.controller";

const router = Router();
router.use(isAuthenticated);
router.get("/me", me);
router.get("/", list);
router.get("/balance", getBalance);
export default router;
