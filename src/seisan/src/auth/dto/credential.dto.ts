import { IsEmail, IsString } from "class-validator";

export class Credential {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
