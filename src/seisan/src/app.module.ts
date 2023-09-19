import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './common/prisma/prisma.service';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentModule } from './payment/payment.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [UserModule, GroupModule, MemberModule, CategoryModule, TransactionModule, PaymentModule, BalanceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
