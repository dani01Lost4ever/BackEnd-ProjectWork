import { Type } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from "class-validator";

export class TransictionDTO {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsMongoId()
  categoryid: string;

  @IsString()
  description: string;

  @IsOptional()
  iban: string;
}

export class getLastTransacDTO {
  @IsNumberString()
  @IsOptional()
  num: number;

  @IsMongoId()
  @IsOptional()
  categoryId: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

// export class QueryTransactionDTO {
//   @IsOptional()
//   @IsString()
//   @IsMongoId()
//   type: string;

//   @IsOptional()
//   @IsNumber()
//   @Min(0)
//   @Max(25)
//   @Type(() => Number)
//   number: number;

//   @IsOptional()
//   @IsDateString()
//   startDate: string;

//   @IsOptional()
//   @IsDateString()
//   endDate: string;
// }
