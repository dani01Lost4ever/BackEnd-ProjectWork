import { NextFunction, Response, Request } from "express";
export class BankAccountExistsError extends Error {
  constructor() {
    super();
    this.name = "BankAccountExists";
    this.message = "Bank account already in use";
  }
}

export class PasswordValidationError extends Error {
  constructor() {
    super();
    this.name = "PasswordValidationError";
    this.message = "Password and confirmation password are different";
  }
}

export const bankAccountHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof BankAccountExistsError ||
    err instanceof PasswordValidationError
  ) {
    res.status(401);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
