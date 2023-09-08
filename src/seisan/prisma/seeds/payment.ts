import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deletePayment = async () => {
  await prisma.payment.deleteMany();
}

export const createPayment = async () => {
  const paymentUser1 = {
    payerId: 1,
    amount: 501,
    method: `比率`,
    ratio: (2 / 3) * 0.7,
    transactionId: 1,
  }

  const paymentUser2 = {
    payerId: 2,
    amount: 500,
    method: `比率`,
    ratio: (2 / 3) * 0.3,
    transactionId: 1,
  }
  const paymentUser3 = {
    payerId: 3,
    amount: 500,
    method: `比率`,
    ratio: (1 / 3),
    transactionId: 1,
  }

  const data = [
    paymentUser1,
    paymentUser2,
    paymentUser3,
  ]

  await prisma.payment.createMany({
    data,
  });
}
