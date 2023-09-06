import { PrismaClient } from "@prisma/client";
import { createUser, deleteUser } from "./user";
import { createGroup, deleteGroup } from "./group";
import { createMember, deleteMember } from "./member";

const prisma = new PrismaClient();

const cleanupDatabase = async () => {
  await deleteUser();
  await deleteGroup();
  await deleteMember();
}

const executeSeed = async () => {
  await createUser();
  await createGroup();
  await createMember();
}

(async () => {
  try {
    console.log(`Seedを開始`);
    await cleanupDatabase();
    await executeSeed();
    console.log(`Seedに成功`);
  } catch (error) {
    console.log(`Seedに失敗`);
    console.log(error);
  } finally {
    await prisma.$disconnect();
    console.log(`Seedを終了`);
  }
})();

