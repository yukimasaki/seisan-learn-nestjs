import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteUser = async () => {
  await prisma.user.deleteMany();
}

export const createUser = async () => {
  const membership = [
    `free`,
    `premium`,
  ];

  const userCount = 4;

  await prisma.user.createMany({
    data: Array(userCount)
    .fill(0)
    .map((_, index) => ({
      email: `user${index + 1}@example.com`,
      displayName: `User ${index + 1}`,
      membership: membership[Math.floor(Math.random() * membership.length)],
    })),
  });
}
