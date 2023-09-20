import { validate } from "../../utils/validation.middleware";
import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { generateTodos } from "./generator.controller";
import { generateTodosDTO } from "./generator.dto";

const router = Router();
router.use(isAuthenticated);
router.get("/:number", validate(generateTodosDTO, "params"), generateTodos);

export default router;
