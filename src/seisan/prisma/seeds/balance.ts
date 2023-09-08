import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBalance = async () => {
  await prisma.balance.deleteMany();
}

export const createBalance = async () => {
  const transactionId = 1;
  const memberCount = 3;
  const totalAmount = 1501;
  const balances = [];

  const promises = Array.from({ length: memberCount }, async (_, member) => {
    const payment = await prisma.payment.findFirst({
      where: {
        payerId: member + 1,
        transactionId,
      },
    });

    console.log(`user: ${member + 1}`);
    console.log(`totalAmount: ${totalAmount}`);
    console.log(`payment.ratio: ${payment.ratio}`);
    console.log(`payment.amount: ${payment.amount}`);

    const balance = {
      lenderId: member + 1,
      borrowerId : null,
      amount: Math.round((totalAmount * payment.ratio) - payment.amount),
      status: `未精算`,
      transactionId,
    }

    balances.push(balance);
  });

  Promise.all(promises)
  .then(() => console.log(balances))
  .catch(error => console.log(error))
}
