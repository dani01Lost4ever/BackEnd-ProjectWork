//OLD
// import {
//   ValidationArguments,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from "class-validator";
// import { User } from "../api/users/user.model";

// @ValidatorConstraint({ name: "IsUserId", async: true })
// export class IsUserId implements ValidatorConstraintInterface {
//   async validate(value: any, args: ValidationArguments) {
//     const todoUser = await User.findById(value);
//     if (!todoUser) {
//       return;
//     }
//     return value;
//   }
//   defaultMessage(args: ValidationArguments) {
//     return `The User does not exist`;
//   }
// }
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { User } from "../api/users/user.model";
import mongoose from "mongoose";

@ValidatorConstraint({ name: "IsUserId", async: true })
export class IsUserId implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    if (mongoose.Types.ObjectId.isValid(value)) {
      const todoUser = await User.findById(value);
      if (!todoUser) {
        return false;
      }
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `User '${args.value}' does not exist`;
  }
}
