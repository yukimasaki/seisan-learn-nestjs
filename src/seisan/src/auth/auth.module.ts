import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { UserService } from '@@nest/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
  ],
})
export class AuthModule {}
