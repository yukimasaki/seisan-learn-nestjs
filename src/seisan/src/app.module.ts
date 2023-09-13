import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './common/prisma/prisma.service';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [UserModule, GroupModule, MemberModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
