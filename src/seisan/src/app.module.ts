import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './common/prisma/prisma.service';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentModule } from './payment/payment.module';
import { BalanceModule } from './balance/balance.module';
import { AuthModule } from './auth/auth.module';
import { RedisService } from './common/redis/redis.service';

@Module({
  imports: [
    UserModule,
    GroupModule,
    MemberModule,
    CategoryModule,
    TransactionModule,
    PaymentModule,
    BalanceModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [PrismaService, RedisService],
})
export class AppModule { }
