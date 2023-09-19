import { IsInt, IsPositive, IsString, Length, MaxLength } from "class-validator";

export class Group {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @Length(32)
  uid: string;

  @IsString()
  @MaxLength(255)
  displayName: string;
}

export class GroupResponse extends Group {}
