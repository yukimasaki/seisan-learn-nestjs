import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RedisService } from '@@nest/common/redis/redis.service';
import { LoginResponse } from './dto/login-response.dto';
import { EXPIRES_IN } from '@@nest/common/master/expires-in.master';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
  ): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.login(req.user);

    // HTTP Cookieをセット
    const expiresAccessToken: number = 1000 * EXPIRES_IN.accessToken;
    req.res.cookie('access_token', loginResponse.tokens.accessToken, {
      httpOnly: true,
      secure: false,
      expiresIn: expiresAccessToken,
    });

    const expiresRefreshToken: number = 1000 * EXPIRES_IN.refreshToken;
    req.res.cookie('refresh_token', loginResponse.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      expiresIn: expiresRefreshToken,
    });

    req.res.cookie('session_id', loginResponse.tokens.sessionId, {
      httpOnly: true,
      secure: false,
      expiresIn: expiresRefreshToken,
    });

    return loginResponse;
  }

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() request) {
//     return request.user;
//   }
}
