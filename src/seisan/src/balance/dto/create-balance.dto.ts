import { OmitType } from "@nestjs/mapped-types";
import { Balance } from "../entities/balance.entity";

export class CreateBalanceDto extends Balance {}
export class CreatePaymentOmitTransactionId extends OmitType(Balance, ['transactionId']) {}
