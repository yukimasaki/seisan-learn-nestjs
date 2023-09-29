import { OmitType } from "@nestjs/mapped-types";
import { IsEmail, IsInt, IsPositive, IsString, MaxLength } from "class-validator";

export class User {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MaxLength(255)
  displayName: string;

  @IsString()
  membership: string;

  @IsString()
  hashedPassword: string;
}

export class UserResponse extends User {}

export class UserOmitPassword extends OmitType(User, ['id', 'hashedPassword']) {}
