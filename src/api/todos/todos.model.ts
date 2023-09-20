import mongoose, { Schema } from "mongoose";
import { Todo } from "./todos.entity";
import { User } from "../users/user.model";
import checkIfExpired from "../../utils/checkDate";

export const todoSchema = new Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

todoSchema.virtual("expired").get(function () {
  if (this.dueDate != null)
    return checkIfExpired(this.dueDate!, this.completed!);
});

todoSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

todoSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Todos = mongoose.model<Todo>("Todo", todoSchema);
