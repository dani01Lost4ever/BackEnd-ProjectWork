import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
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
  num: number;
}
