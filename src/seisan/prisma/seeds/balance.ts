import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBalance = async () => {
  await prisma.balance.deleteMany();
}

export const createBalance = async () => {
  const transactionId = 1;
  const payments = await prisma.payment.findMany({
    where: { transactionId },
  });

  // 規定額より支払いが多いユーザーを抽出
  const highPaymentUsers = payments.filter(payment =>
    payment.actualPaymentAmount > payment.defaultPaymentAmount
  );

  // 規定額より支払いが少ないユーザーを抽出
  const lowPaymentUsers = payments.filter(payment =>
    payment.actualPaymentAmount < payment.defaultPaymentAmount
  );

  // 支払いが多いユーザー・支払いが少ないユーザーごとにループ処理で賃借記録を作成する
  const balances = [];
  lowPaymentUsers.map(lowPaymentUser => {
    highPaymentUsers.map(highPaymentUser => {
      const balance = {
        lenderId: lowPaymentUser.payerId,
        borrowerId: highPaymentUser.payerId,
        amount: highPaymentUser.difference,
        status: `未精算`,
        transactionId,
      }
      balances.push(balance);
    });
  });

  await prisma.balance.createMany({
    data: balances
  });
}
