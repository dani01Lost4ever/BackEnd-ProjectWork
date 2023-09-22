import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.get("/me", isAuthenticated);

