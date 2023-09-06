import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteCategory = async () => {
  await prisma.category.deleteMany();
}

export const createCategory = async () => {
  const categoryGroup1 = [
    `食費`,
    `日用品`,
    `通信費`,
    `交通費`,
  ];

  const categoryGroup2 = [
    `光熱費`,
    `美容費`,
    `住宅費`,
    `分類不能`,
  ];

  await prisma.category.createMany({
    data: categoryGroup1
    .map((category, _) => ({
      icon: `category/icon.png`,
      category,
      groupId: 1,
    })),
  });

  await prisma.category.createMany({
    data: categoryGroup2
    .map((category, _) => ({
      icon: `category/icon.png`,
      category,
      groupId: 2,
    })),
  });
}
