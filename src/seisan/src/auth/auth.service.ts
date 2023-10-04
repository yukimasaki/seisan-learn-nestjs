import { UserOmitPassword, UserResponse } from '@@nest/user/entities/user.entity';
import { UserService } from '@@nest/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload.dto';
import { Credential } from './dto/credential.dto';
import { Tokens } from './dto/tokens.dto';
import { randomUUID } from 'crypto';
import { LoginResponse } from './dto/login-response.dto';
import { RedisService } from '@@nest/common/redis/redis.service';
import { EXPIRES_IN } from '@@nest/common/master/expires-in.master';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(
    credential: Credential
  ): Promise<UserOmitPassword | null> {
    const { email, password } = credential;
    const user: UserResponse | null = await this.userService.findOne(email);
    if (!user) throw new NotFoundException

    const isMatch: boolean = await bcrypt.compare(password, user.hashedPassword);
    if (user && isMatch) {
      const { hashedPassword, ...userOmitPassword } = user;
      return userOmitPassword;
    }

    return null;
  }

  async login(
    userOmitPassword: UserOmitPassword
  ): Promise<LoginResponse> {
    // 1. Tokensを生成
    const tokens: Tokens = await this.getTokens(userOmitPassword);

    // 2. RedisにセッションIDとハッシュ化したリフレッシュトークンを保存
    const saltOrRounds: number = 10;
    const sessionId: string = randomUUID();
    const hashedRefreshToken: string = await bcrypt.hash(tokens.refreshToken, saltOrRounds);
    const expiresRefreshToken: number = EXPIRES_IN.refreshToken;
    await this.redisService.setValue(sessionId, hashedRefreshToken, expiresRefreshToken);

    return {
      userOmitPassword,
      tokens,
    }
  }

  async getTokens(
    userOmitPassword: UserOmitPassword
  ): Promise<Tokens>
  {
    const payload: JwtPayload = {
      email: userOmitPassword.email,
    }
    const [
      accessToken,
      refreshToken,
      sessionId,
    ] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        // expiresIn: '15m',
        expiresIn: '30s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        // expiresIn: '7d',
        expiresIn: '1m',
      }),
      randomUUID(),
    ]);

    return {
      accessToken,
      refreshToken,
      sessionId,
    }
  }
}
