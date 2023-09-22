import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deletePayment = async () => {
  await prisma.payment.deleteMany();
}

export const createPayment = async () => {
  const transactionId = 1;
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId }
  });
  const totalAmount = transaction.amount;

  const user2Input = {
    payerId: 2,
    method: `比率`,
    ratio: 1 / 4,
    transactionId: 1,
    actualPaymentAmount: 630,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user2Input.defaultPaymentAmount = Math.round(totalAmount * user2Input.ratio);
  user2Input.difference =
    user2Input.actualPaymentAmount - user2Input.defaultPaymentAmount;

  const user3Input = {
    payerId: 3,
    method: `比率`,
    ratio: 1 / 4,
    transactionId: 1,
    actualPaymentAmount: 630,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user3Input.defaultPaymentAmount = Math.round(totalAmount * user3Input.ratio);
  user3Input.difference =
    user3Input.actualPaymentAmount - user3Input.defaultPaymentAmount;

    const user4Input = {
    payerId: 4,
    method: `比率`,
    ratio: 1 / 4,
    transactionId: 1,
    actualPaymentAmount: 611,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user4Input.defaultPaymentAmount = Math.round(totalAmount * user4Input.ratio);
  user4Input.difference =
    user4Input.actualPaymentAmount - user4Input.defaultPaymentAmount;

  const user1Input = {
    payerId: 1,
    method: `比率`,
    ratio: 1 / 4,
    transactionId: 1,
    actualPaymentAmount: 630,
    defaultPaymentAmount: 0,
    difference: 0,
  }
  user1Input.defaultPaymentAmount =
    totalAmount - (
      user2Input.defaultPaymentAmount +
      user3Input.defaultPaymentAmount +
      user4Input.defaultPaymentAmount
    );
  user1Input.difference =
    user1Input.actualPaymentAmount - user1Input.defaultPaymentAmount;

  const data = [
    user1Input,
    user2Input,
    user3Input,
    user4Input,
  ];

  await prisma.payment.createMany({
    data,
  });
}
