import { OmitType } from "@nestjs/mapped-types";
import { Payment } from "../entities/payment.entity";

export class CreatePaymentDto extends OmitType(
  Payment, ['id']
) {}
export class CreatePaymentOmitTransactionId extends OmitType(
  Payment, ['id', 'transactionId']
) {}
