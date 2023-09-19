import { Transaction } from "../entities/transaction.entity";
import { CreatePaymentOmitTransactionId } from "src/payment/dto/create-payment.dto";
import { CreateBalanceOmitTransactionId } from "src/balance/dto/create-balance.dto";

export class CreateTransactionDto extends Transaction {}
export class CreateTransactionComplex {
  createTransactionDto: CreateTransactionDto;
  createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[];
  createBalanceOmitTransactionId: CreateBalanceOmitTransactionId[];
}
