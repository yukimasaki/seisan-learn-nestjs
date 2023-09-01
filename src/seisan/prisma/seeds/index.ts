import { PrismaClient } from "@prisma/client";
import { deleteUser, createUser } from "./user";

const prisma = new PrismaClient();

const executeSeed = async () => {
  console.log(`Seedの実行を開始しました`);

  await deleteUser();

  await createUser();

  console.log(`Seedの実行が完了しました`);
}

try {
  executeSeed();
} catch (error) {
  console.log(error);
} finally {
  (async () => await prisma.$disconnect())();
}
