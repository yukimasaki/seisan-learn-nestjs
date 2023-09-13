import { IsInt, IsPositive } from "class-validator";

export class Member {
  @IsInt()
  @IsPositive()
  userId!: number;

  @IsInt()
  @IsPositive()
  groupId!: number;
}

export class MemberResponse extends Member {}
