import { OmitType } from "@nestjs/mapped-types";
import { Balance } from "../entities/balance.entity";

export class CreateBalanceDto extends OmitType(
  Balance, ['id']
) {}
export class CreateBalanceOmitTransactionId extends OmitType(
  Balance, ['id', 'transactionId']
) {}
