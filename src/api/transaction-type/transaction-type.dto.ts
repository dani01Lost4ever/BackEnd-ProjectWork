import { IsOptional, IsString } from "class-validator";

export class QueryTransactionTypeDTO {
  @IsString()
  category: string;

  @IsString()
  typology: string;
}
