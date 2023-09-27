import { NextFunction, Response, Request } from "express";

export class NoTransactionsFound extends Error {
  constructor() {
    super();
    this.name = "NoTransactionsFound";
    this.message = "There're no transactions with this criteria";
  }
}

export const transactionResearchHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NoTransactionsFound) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
