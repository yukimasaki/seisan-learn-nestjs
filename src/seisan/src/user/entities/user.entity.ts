import { IsEmail, IsInt, IsPositive, IsString, MaxLength } from "class-validator";

export class User {
  @IsInt()
  @IsPositive()
  id!: number;

  @IsString()
  @IsEmail()
  email!: string

  @IsString()
  hashedPassword!: string;

  @IsString()
  @MaxLength(255)
  displayName!: string;
}

export class UserResponse extends User {}
