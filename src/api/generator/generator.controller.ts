import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { Todo } from "../todos/todos.entity";
import generatorService from "./generator.service";
import todosService from "../todos/todos.service";
import { generateTodosDTO } from "./generator.dto";

export const generateTodos = async (
  req: TypedRequest<any, any, generateTodosDTO>,
  res: Response,
  next: NextFunction
) => {
  const number = req.params.number;
  try {
    const generatedTodos: Todo[] = [];

    for (let i = 0; i < number; i++) {
      const todo: Todo = await generatorService.generateRandomTodos();
      const addedTodo = await todosService.add(
        todo,
        "64f4919b08ac84d346b0a86d"
      );
      generatedTodos.push(addedTodo);
    }

    return res.status(200).json(generatedTodos);
  } catch (err: any) {
    next(err);
  }
};
