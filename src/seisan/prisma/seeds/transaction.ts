import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteTransaction = async () => {
  await prisma.transaction.deleteMany();
}

export const createTransaction = async () => {
  const data = {
    creatorId: 1,
    amount: 2501,
    paymentDate: new Date(),
    title: `取引 #001`,
    status: `未精算`,
    categoryId: 1,
    groupId: 1,
  }

  await prisma.transaction.createMany({
    data
  });
}
