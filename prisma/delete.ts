import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   // Delete all tourist attractions
   await prisma.touristAttraction.deleteMany({});

   // Delete all users
   await prisma.user.deleteMany({});
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
