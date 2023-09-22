import { IsMongoId, IsNumber, IsPositive, IsString } from "class-validator";

export class TransictionDTO {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsMongoId()
  categoryid: string;

  // @IsMongoId()
  // bankaccoutid: string;

  @IsString()
  description: string;
}
