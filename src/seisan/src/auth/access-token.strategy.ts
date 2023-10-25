import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { UserOmitPassword } from "@@nest/user/entities/user.entity";
import { UserService } from "@@nest/user/user.service";
import { Tokens } from "./dto/tokens.dto";
import { LoginResponse } from "./dto/login-response.dto";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const accessToken: string = req.cookies.access_token;
          if (!accessToken) return null;
          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<LoginResponse> {
    const userOmitPassword: UserOmitPassword = await this.userService.findByEmail(payload.email);
    const tokens: Tokens = {
      accessToken: req.cookies?.access_token,
      refreshToken: req.cookies?.refresh_token,
      sessionId: req.cookies?.session_id,
    }
    return {
      userOmitPassword,
      tokens,
    };
  }
}
