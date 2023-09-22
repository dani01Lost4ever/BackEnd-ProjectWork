import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { TransictionDTO } from "./transaction.dto";
import { transaction } from "./transaction.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.post("/", validate(TransictionDTO, "body"), transaction);

export default router;
