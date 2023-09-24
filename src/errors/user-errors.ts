import { NextFunction, Response, Request } from "express";

export class AdminPrivilegesRequired extends Error {
  constructor() {
    super();
    this.name = "AdminPrivilegesRequired";
    this.message = "Only Admin can perform this action.";
  }
}

export const userHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AdminPrivilegesRequired) {
    res.status(401);
    res.json({
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
};
