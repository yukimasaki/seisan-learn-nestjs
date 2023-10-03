import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RedisService } from '@@nest/common/redis/redis.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request): Promise<void> {
    const access_token = await this.authService.login(request.user);
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 60);

    request.res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      expires: expirationDate,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
