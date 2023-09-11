import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBalance = async () => {
  await prisma.balance.deleteMany();
}

export const createBalance = async () => {
  const userCount = await prisma.user.count();
  const transactionId = 1;
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId }
  });
  const totalAmount = transaction.amount;
  const balances = [];

  const promises = Array.from({ length: userCount }, async (_, member) => {
    const payment = await prisma.payment.findFirst({
      where: {
        payerId: member + 1,
        transactionId,
      },
    });

    console.log(payment);

    const balance = {
      lenderId: member + 1,
      borrowerId : null,
      amount: Math.round((totalAmount * payment.ratio) - payment.actualPaymentAmount),
      status: `未精算`,
      transactionId,
    }

    balances.push(balance);
  });

  Promise.all(promises)
  .then(() => console.log(balances))
  .catch(error => console.log(error))
}
