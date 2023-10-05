import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UserService } from '@@nest/user/user.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '@@nest/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './access-token.strategy';
import { RedisService } from '@@nest/common/redis/redis.service';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RedisService,
  ],

})
export class AuthModule {}
