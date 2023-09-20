import { Types } from "mongoose";
import { User } from "../users/user.entity";

export interface Todo {
  id?: string;
  title: string;
  dueDate?: Date;
  completed?: boolean;
  expired?: boolean;
  createdBy?: Types.ObjectId;
  assignedTo?: Types.ObjectId | string | User;
}
