import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteGroup = async () => {
  await prisma.group.deleteMany();
}

export const createGroup = async () => {
  await prisma.group.createMany({
    data: Array(2)
    .fill(0)
    .map((_, index) => ({
      // snowflakeでuidを生成する
      uid: 123456,
      displayName: `Group ${index}`,
    })),
  });
}
