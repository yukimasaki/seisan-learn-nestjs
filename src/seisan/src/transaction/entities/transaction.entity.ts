import { IsDate, IsInt, IsPositive, IsString } from "class-validator";

export class Transaction {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @IsPositive()
  creatorId: number;

  @IsInt()
  @IsPositive()
  editorId: number;

  @IsInt()
  amount: number;

  @IsDate()
  paymentDate: Date;

  @IsString()
  title: string;

  @IsString()
  memo: string;

  @IsString()
  status: string;

  @IsInt()
  @IsPositive()
  categoryId: number;

  @IsInt()
  @IsPositive()
  groupId: number;
}

export class TransactionResponse extends Transaction {}
