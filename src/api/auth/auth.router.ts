import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddUserDTO, ChangePasswordDTO, LoginDTO } from "./auth.dto";
import { add, changePassword, login } from "./auth.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.post("/register", validate(AddUserDTO, "body"), add);
router.post("/login", validate(LoginDTO), login);
router.patch(
  "/changePassword",
  isAuthenticated,
  validate(ChangePasswordDTO, "body"),
  changePassword
);
export default router;
