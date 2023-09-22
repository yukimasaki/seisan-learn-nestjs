import { Transaction } from "../entities/transaction.entity";
import { CreatePaymentOmitTransactionId } from "@@nest/payment/dto/create-payment.dto";
import { CreateBalanceOmitTransactionId } from "@@nest/balance/dto/create-balance.dto";
import { OmitType } from "@nestjs/mapped-types";

export class CreateTransactionDto extends OmitType(Transaction, ['id', 'editorId']) {}
export class CreateTransactionComplex {
  createTransactionDto: CreateTransactionDto;
  createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[];
  createBalanceOmitTransactionId: CreateBalanceOmitTransactionId[];
}
