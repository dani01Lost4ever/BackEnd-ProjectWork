import { NextFunction, Response, Request } from "express";

export class CategoryNotFound extends Error {
  constructor() {
    super();
    this.name = "CategoryNotFound";
    this.message = "Wrong category or not found";
  }
}

export class InternalTypeError extends Error {
  constructor() {
    super();
    this.name = "InternalTypeError";
    this.message = "Category type not found or corrupted";
  }
}

export class InsufficientBalance extends Error {
  constructor() {
    super();
    this.name = "InsufficientBalance";
    this.message = "Insufficient Balance for the transaction";
  }
}

export class InitializeNewAccoutFailed extends Error {
  constructor() {
    super();
    this.name = "InitializeNewAccoutFailed";
    this.message = "Impossible to create a new accout";
  }
}

export class BankTransactionFailed extends Error {
  constructor() {
    super();
    this.name = "BankTransactionFailed";
    this.message =
      "Impossible to ultimate the bank transaction, try again later";
  }
}

export class GenneralTransactionError extends Error {
  constructor() {
    super();
    this.name = "GenneralTransactionError";
    this.message =
      "Error during the transaction, check console for more details, try again later";
  }
}

export class BalanceCalculationError extends Error {
  constructor() {
    super();
    this.name = "BalanceCalculationError";
    this.message =
      "Error generated while computing the new accout balance, contact support";
  }
}

export const transactionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof CategoryNotFound ||
    err instanceof InternalTypeError ||
    err instanceof InsufficientBalance ||
    err instanceof InitializeNewAccoutFailed ||
    err instanceof BankTransactionFailed ||
    err instanceof GenneralTransactionError ||
    err instanceof BalanceCalculationError
  ) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
