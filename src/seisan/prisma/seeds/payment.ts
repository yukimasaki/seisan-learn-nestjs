import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deletePayment = async () => {
  await prisma.payment.deleteMany();
}

export const createPayment = async () => {
  const transaction = await prisma.transaction.findFirst({
    where: { id: 1 }
  });
  const totalAmount = transaction.amount;

  const user2Input = {
    payerId: 2,
    method: `比率`,
    ratio: (2 / 3) * 0.3,
    transactionId: 1,
    actualPaymentAmount: 500,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user2Input.defaultPaymentAmount = Math.round(totalAmount * user2Input.ratio);
  user2Input.difference =
    user2Input.actualPaymentAmount - user2Input.defaultPaymentAmount;

  const user3Input = {
    payerId: 3,
    method: `比率`,
    ratio: (1 / 3),
    transactionId: 1,
    actualPaymentAmount: 500,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user3Input.defaultPaymentAmount = Math.round(totalAmount * user3Input.ratio);
  user3Input.difference =
    user3Input.actualPaymentAmount - user3Input.defaultPaymentAmount;

  const user1Input = {
    payerId: 1,
    method: `比率`,
    ratio: (2 / 3) * 0.7,
    transactionId: 1,
    actualPaymentAmount: 501,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user1Input.defaultPaymentAmount =
    totalAmount - (user2Input.defaultPaymentAmount + user3Input.defaultPaymentAmount);
  user1Input.difference =
    user1Input.actualPaymentAmount - user1Input.defaultPaymentAmount;

  const data = [
    user1Input,
    user2Input,
    user3Input,
  ];

  await prisma.payment.createMany({
    data,
  });
}
