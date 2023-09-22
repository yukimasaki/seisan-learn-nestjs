import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreatePaymentOmitTransactionId } from '@@nest/payment/dto/create-payment.dto';
import { CreateTransactionComplex, CreateTransactionDto } from '@@nest/transaction/dto/create-transaction.dto';
import { randBetween } from '@@nest/utils/randBetween';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { TransactionService } from '@@nest/transaction/transaction.service';

const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
}

export const createTransaction = async () => {
  const prismaService = new PrismaService();
  const transactionService = new TransactionService(prismaService);

  const createTransactionDto: CreateTransactionDto = {
    creatorId: 1,
    amount: randBetween(1000, 49999),
    paymentDate: randomDate('2023-09-01', '2023-09-30'),
    title: `取引 #${randBetween(1, 100)}`,
    memo: `備考`,
    status: `未精算`,
    categoryId: randBetween(1, 4),
    groupId: 1,
  }

  const method: string = `比率`;
  const ratio: number = 1 / 4;
  const userCount: number = await prisma.user.count();

  const memberDefaultAmount: number = Math.round(createTransactionDto.amount * ratio);

  const memberActualAmounts: number[] = Array.from({ length: userCount - 1 }, (_, index) => {
    return Math.round(createTransactionDto.amount * ratio) - randBetween(0, 100);
  });

  const init = 0;
  const totalActualAmountWithoutLeader: number = memberActualAmounts.reduce((accumulator, currentValue) =>
    accumulator + currentValue, init
  );
  const leaderAmount: number = createTransactionDto.amount - totalActualAmountWithoutLeader;

  const createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[] =
  Array.from({ length: userCount }, (_, index) => (
    {
      payerId: index + 1,
      actualPaymentAmount: index === 0 ? leaderAmount : totalActualAmountWithoutLeader[index],
      defaultPaymentAmount: index === 0 ? leaderAmount : memberDefaultAmount,
      difference: 0,
      method,
      ratio,
    }
  ));

  const createBalanceOmitTransactionId = [
  ];

  const createTransactionComplex: CreateTransactionComplex = {
    createTransactionDto,
    createPaymentOmitTransactionId,
    createBalanceOmitTransactionId,
  }

  await transactionService.createWithTransaction(createTransactionComplex);
}

const randomDate = (
  start: string,
  end: string,
): Date => {
  const startDate = dayjs(start).valueOf();
  const endDate = dayjs(end).valueOf();

  const randomMillis = Math.random() * (endDate - startDate) + startDate;
  const randomDate = dayjs(randomMillis).toDate();

  return randomDate;
}
