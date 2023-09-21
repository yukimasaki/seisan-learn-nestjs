import { IsInt, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class Payment {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @IsPositive()
  payerId: number;

  @IsInt()
  actualPaymentAmount: number;

  @IsInt()
  defaultPaymentAmount: number;

  @IsInt()
  difference: number;

  @IsString()
  method: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  ratio: number;

  @IsInt()
  @IsPositive()
  transactionId: number;
}

export class PaymentResponse extends Payment {}
