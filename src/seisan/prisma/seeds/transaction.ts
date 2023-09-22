import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from '@@nest/common/prisma/prisma.service';
import { CreatePaymentOmitTransactionId } from '@@nest/payment/dto/create-payment.dto';
import { CreateTransactionComplex, CreateTransactionDto } from '@@nest/transaction/dto/create-transaction.dto';
import { TransactionService } from '@@nest/transaction/transaction.service';
import { randBetween } from 'utils/randBetween';

const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
}

export const createTransaction = async () => {
  const prismaService = new PrismaService();
  const transactionService = new TransactionService(prismaService);

  const createTransactionDto: CreateTransactionDto = {
    creatorId: 1,
    amount: randBetween(100, 49999),
    paymentDate: randomDates('2023-09-01', '2023-09-30'),
    title: `取引 #${randBetween(1, 100)}`,
    memo: `備考`,
    status: `未精算`,
    categoryId: randBetween(1, 4),
    groupId: 1,
  }

  const method = `比率`;
  const ratio = 1 / 4;
  const userCount = await prisma.user.count();

  const memberAmounts: number[] = Array.from({ length: userCount }, (_, index) =>
    Math.round(createTransactionDto.amount * ratio)
  );

  const initialValue = 0;
  const memberTotal: number = memberAmounts.reduce((accumulator, currentValue) =>
    accumulator + currentValue, initialValue
  );

  const leaderAmount: number = createTransactionDto.amount - memberTotal;

  const createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[] =
  Array.from({ length: userCount }, (_, index) => (
    {
      payerId: userCount + 1,
      actualPaymentAmount: index === 0 ? leaderAmount : memberAmounts[index],
      defaultPaymentAmount: index === 0 ? leaderAmount : memberAmounts[index],
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

const randomDates = (
  start: string,
  end: string,
): Date => {
  const startDate = dayjs(start).valueOf();
  const endDate = dayjs(end).valueOf();

  const randomMillis = Math.random() * (endDate - startDate) + startDate;
  const randomDate = dayjs(randomMillis).toDate();

  return randomDate;
}
