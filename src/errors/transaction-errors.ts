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

export const transactionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof CategoryNotFound ||
    err instanceof InternalTypeError ||
    err instanceof InsufficientBalance
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
