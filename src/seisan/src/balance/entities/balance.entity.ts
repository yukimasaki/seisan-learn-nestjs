import { IsInt, IsPositive, IsString } from "class-validator";

export class Balance {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @IsPositive()
  lenderId: number;

  @IsInt()
  @IsPositive()
  borrowerId: number;

  @IsInt()
  amount: number;

  @IsString()
  status: string;

  @IsInt()
  @IsPositive()
  transactionId: number
}

export class BalanceResponse extends Balance {}
