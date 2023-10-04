import { UserOmitPassword } from "@@nest/user/entities/user.entity";
import { Tokens } from "./tokens.dto";

export class LoginResponse {
  userOmitPassword: UserOmitPassword;
  tokens: Tokens;
}
