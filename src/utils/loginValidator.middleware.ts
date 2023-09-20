import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found";
import { Todos } from "../api/todos/todos.model";
import { TypedRequest } from "./typed-request.interface";
import { CustomError } from "../errors";
import { ValidationError } from "../errors/validationError";

export const loginValidator = (type: "two" | "one" = "two") => {
  return async (
    req: TypedRequest<any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user!.id;
    const todoId = req.params.id;

    const q: any = {
      _id: todoId,
    };

    if (type === "two") {
      q.$or = [{ assignedTo: userId }, { createdBy: userId }];
    } else {
      q._id = todoId;
    }

    try {
      const todo = await Todos.findOne(q);

      if (todo) {
        next();
      } else {
        //OLD
        // res.status(404);
        // res.send("You cannot edit this Todo or this Todo does not exist.");
        throw new ValidationError([
          {
            property: "Todo",
            constraints: {
              notexist:
                "You cannot edit this Todo or this Todo does not exist.",
            },
            value: todoId,
          },
        ]);
      }
    } catch (err) {
      next(err);
    }
  };
};
