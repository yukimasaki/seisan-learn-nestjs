import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteMember = async () => {
  await prisma.member.deleteMany();
}

export const createMember = async () => {
  await prisma.member.createMany({
    data: Array(10)
    .fill(0)
    .map((_, index) => ({
      userId: index + 1,
      groupId: 1,
    })),
  });
}
