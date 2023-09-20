import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { IsUserId } from "../../utils/customs.validator";

export class AddTodosDTO {
  @IsString()
  title: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;

  @IsMongoId()
  @IsOptional()
  @Validate(IsUserId)
  assignedTo: string;
}

export class SetCompleteDTO {
  @IsMongoId()
  id: string;
}

export class AssignParamDTO {
  @IsMongoId()
  id: string;
}

export class AssignBodyDTO {
  @Validate(IsUserId)
  @IsMongoId()
  userId: string;
}

export class ListValidateDTO {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value.toLowerCase() == "true") {
      return true;
    }
    if (value.toLowerCase() == "false") {
      return false;
    }
    return value;
  })
  showCompleted: boolean;
}

export class deleteDTO {
  @IsMongoId()
  id: string;
}
