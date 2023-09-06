import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deletePayment = async () => {
  await prisma.payment.deleteMany();
}

export const createPayment = async () => {
  // const data =

  // await prisma.payment.createMany({
  //   data
  // });
}
