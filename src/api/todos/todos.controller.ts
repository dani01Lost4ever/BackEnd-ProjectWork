import { Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import todosService from "./todos.service";
import {
  AddTodosDTO,
  AssignBodyDTO,
  AssignParamDTO,
  ListValidateDTO,
  SetCompleteDTO,
  deleteDTO,
} from "./todos.dto";
import { Todo } from "./todos.entity";

export const list = async (
  req: TypedRequest<any, ListValidateDTO, any>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user!;
  const checkCompleted = req.query.showCompleted;
  const list = await todosService.find(user.id!, checkCompleted);
  res.json(list);
};

export const add = async (
  req: TypedRequest<AddTodosDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;
    const { title, dueDate, assignedTo } = req.body;
    const newTodo: Todo = {
      title,
      dueDate,
      assignedTo,
    };
    const saved = await todosService.add(newTodo, user.id!);
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const setComplete = async (
  req: TypedRequest<any, any, SetCompleteDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const updated = await todosService.update(id, { completed: true });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const setUncomplete = async (
  req: TypedRequest<any, any, SetCompleteDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const updated = await todosService.update(id, { completed: false });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const assignTo = async (
  req: TypedRequest<AssignBodyDTO, any, AssignParamDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const assignedToUser = req.body.userId;

    const updated = await todosService.update(id, {
      assignedTo: assignedToUser,
    });
    console.log(updated);
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const deleteTodo = async (
  req: TypedRequest<any, any, deleteDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deletedTodo = await todosService.delete(id);
    res.status(200).json(deletedTodo);
  } catch (err: any) {
    next(err);
  }
};

export const deleteTodoByUser = async (
  req: TypedRequest<any, any, deleteDTO>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deletedTodos = await todosService.deleteByUser(id);
    res.status(200).json(deletedTodos);
  } catch (err: any) {
    next(err);
  }
};
