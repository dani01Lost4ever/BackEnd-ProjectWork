import { Schema, model } from "mongoose";
import { Log as iLog } from "./log.entity";
export const LogSchema = new Schema<iLog>({
  ip: String,
  date: Date,
  result: String,
});

LogSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

LogSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Log = model<iLog>("Log", LogSchema);
