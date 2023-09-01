import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteUser = async () => {
  await prisma.user.deleteMany();
}

export const createUser = async () => {
  await prisma.user.createMany({
    data: Array(60)
    .fill(0)
    .map((_, index) => ({
      email: `user${index}@example.com`,
      displayName: `User ${index}`,
      membership: '無料',
    })),
  });
}
