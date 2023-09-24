import { IsOptional, IsString } from "class-validator";

export class QueryTransactionTypeDTO {
    @IsOptional()
    @IsString()
    category: string;
  
    @IsOptional()
    @IsString()
    typology: string;
}
