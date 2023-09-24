import {
  IsMongoId,
  IsNumber,
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
