import { OmitType } from "@nestjs/mapped-types";
import { Payment } from "../entities/payment.entity";

export class CreatePaymentDto extends Payment {}
export class CreatePaymentOmitTransactionId extends OmitType(Payment, ['transactionId']) {}
