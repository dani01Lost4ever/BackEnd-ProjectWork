import { assign } from "lodash";
import { Todo } from "./todos.entity";
import { Todos as TodosModel } from "./todos.model";
import { NotFoundError } from "../../errors/not-found";
import { Types } from "mongoose";

export class TodosService {
  // async find(userId: string): Promise<Todo[]> {
  //   return TodosModel.find({
  //     $or: [{ createdBy: userId }, { assignedTo: userId }],
  //   }).populate("createdBy");
  // }

  // async find(userId: string, showCompleted: boolean = false) {
  //   //OLD
  //   // const now = new Date();
  //   // const filter: any = {
  //   //   $or: [{ createdBy: userId }, { assignedTo: userId }],
  //   // };
  //   // if (!showCompleted) {
  //   //   filter.completed = false;
  //   // }
  //   // const list = await TodosModel.find(filter)
  //   //   .populate("createdBy assignedTo")
  //   //   .sort({ dueDate: 1, createdAt: 1 });
  //   // return list;
  //   //const now = new Date();
  //   const filter: any = {
  //     $or: [{ createdBy: userId }, { assignedTo: userId }],
  //   };
  //   if (!showCompleted) {
  //     filter.completed = false;
  //   }
  //   const listWithDueDate = await TodosModel.find({
  //     ...filter,
  //     dueDate: { $exists: true, $ne: null },
  //   })
  //     .populate("createdBy assignedTo")
  //     .sort({ dueDate: 1, createdAt: 1 });

  //   const listWithoutDueDate = await TodosModel.find({
  //     ...filter,
  //     dueDate: { $exists: false },
  //   })
  //     .populate("createdBy assignedTo")
  //     .sort({ createdAt: 1 });

  //   return [...listWithDueDate, ...listWithoutDueDate];
  // }

  async find(userId: string, showCompleted: boolean = false) {
    const todos = await this.query(userId, showCompleted);
    todos.map((todo) => {
      if (!todo.assignedTo?.fullName) {
        delete todo.assignedTo;
      }
    });
    return todos;
  }
  async query(userId: string, showCompleted: boolean = false) {
    const filter: any = {
      $or: [
        { createdBy: new Types.ObjectId(userId) },
        { assignedTo: new Types.ObjectId(userId) },
      ],
    };
    if (!showCompleted) {
      filter.completed = false;
    }

    return await TodosModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedTo",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$assignedTo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          id: "$_id",
          sortDueDate: {
            $ifNull: ["$dueDate", new Date("9999-12-31")],
          },
          "createdBy.fullName": {
            $concat: ["$createdBy.firstName", " ", "$createdBy.lastName"],
          },
          "assignedTo.fullName": {
            $cond: [
              { $eq: ["$assignedTo", null] },
              null,
              {
                $concat: ["$assignedTo.firstName", " ", "$assignedTo.lastName"],
              },
            ],
          },
          expired: {
            $cond: [
              { $eq: ["$dueDate", null] },
              false,
              {
                $and: [
                  { $ne: ["$completed", true] },
                  { $lt: ["$dueDate", new Date()] },
                ],
              },
            ],
          },
        },
      },
      { $sort: { sortDueDate: 1, createdAt: 1 } },
      {
        $unset: [
          "__v",
          "createdBy.__v",
          "assignedTo.__v",
          "sortDueDate",
          "_id",
        ],
      },
    ]);
  }

  async add(todo: Todo, createdBy: string): Promise<Todo> {
    const newTodo = await TodosModel.create({ ...todo, createdBy: createdBy });
    await newTodo.populate("createdBy assignedTo");
    return newTodo;
  }

  private async _getById(id: string) {
    return TodosModel.findOne({ _id: id }).populate("createdBy assignedTo");
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    assign(item, data);
    await item.save();
    return this._getById(id) as Promise<Todo>;
  }

  async delete(id: string) {
    const todo = await this._getById(id);
    if (!todo) {
      throw new NotFoundError();
    }
    await todo.deleteOne();
  }
  async deleteByUser(id: string) {
    const response = await TodosModel.deleteMany({ createdBy: id });
    return response;
  }
}

export default new TodosService();
