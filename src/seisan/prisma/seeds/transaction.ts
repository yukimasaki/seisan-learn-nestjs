import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
}

export const createTransaction = async () => {
  const userCount = await prisma.user.count();
  const transactionsPerUser = 1;

  const data = Array.from({ length: userCount }, (_, userId) =>
    Array.from({ length: transactionsPerUser }, (_, index) => ({
      creatorId: userId + 1,
      amount: 2501,
      paymentDate: new Date(),
      title: `取引 #${index + 1}`,
      status: `未精算`,
      categoryId: 1,
      groupId: 1,
    }))
  ).flat();

  await prisma.transaction.createMany({
    data
  });
}
