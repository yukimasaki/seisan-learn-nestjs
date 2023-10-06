import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginResponse } from './dto/login-response.dto';
import { EXPIRES_IN } from '@@nest/common/master/expires-in.master';
import { RefreshTokenAuthGuard } from './refresh-token-auth.guard';
import { AccessTokenAuthGuard } from './access-token-auth.guard';
import { UserOmitPassword } from '@@nest/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
  ): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.signTokens(req.user);
    this._setCookie(req, loginResponse);
    return loginResponse;
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  async refreshToken(
    @Request() req
  ): Promise<LoginResponse> {
    const loginResponse: LoginResponse = req.user;
    this._setCookie(req, loginResponse);
    return loginResponse;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  getProfile(
    @Request() req
  ): UserOmitPassword {
    const userOmitPassword: UserOmitPassword = req.user;
    return userOmitPassword;
  }

  _setCookie(
    req,
    loginResponse: LoginResponse,
  ): void {
    const now = new Date();
    const expiresAccessToken: number = 1000 * EXPIRES_IN.accessToken;
    req.res.cookie('access_token', loginResponse.tokens.accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresAccessToken)),
    });

    const expiresRefreshToken: number = 1000 * EXPIRES_IN.refreshToken;
    req.res.cookie('refresh_token', loginResponse.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresRefreshToken)),
    });

    req.res.cookie('session_id', loginResponse.tokens.sessionId, {
      httpOnly: true,
      secure: false,
      expires: new Date(now.getTime() + (expiresRefreshToken)),
    });
  }
}
