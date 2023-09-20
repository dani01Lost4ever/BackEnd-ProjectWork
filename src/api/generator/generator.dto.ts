import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class generateTodosDTO {
  @IsNumber()
  @Type(() => Number)
  number: number;
}
