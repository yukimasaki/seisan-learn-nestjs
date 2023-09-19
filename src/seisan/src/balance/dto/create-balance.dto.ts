import { OmitType } from "@nestjs/mapped-types";
import { Balance } from "../entities/balance.entity";

export class CreateBalanceDto extends Balance {}
export class CreateBalanceOmitTransactionId extends OmitType(Balance, ['transactionId']) {}
