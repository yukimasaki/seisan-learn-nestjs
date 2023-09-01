import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteUser = async () => {
  await prisma.user.deleteMany();
}

export const createUser = async () => {
  const membership = [
    `free`,
    `premium`,
  ];

  await prisma.user.createMany({
    data: Array(10)
    .fill(0)
    .map((_, index) => ({
      email: `user${index}@example.com`,
      displayName: `User ${index}`,
      membership: membership[Math.floor(Math.random() * membership.length)],
    })),
  });
}
