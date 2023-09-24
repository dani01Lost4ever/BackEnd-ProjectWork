import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { list, me } from "./bank-account.controller";

const router = Router();

router.get("/me", isAuthenticated, me);

router.get("/", isAuthenticated, list);
export default router;
