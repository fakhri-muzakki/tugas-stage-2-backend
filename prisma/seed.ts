import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // ==============================
  // 1️⃣ Create Users
  // ==============================

  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'Fakhri',
      email: 'fakhri@mail.com',
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Andi',
      email: 'andi@mail.com',
      password: passwordHash,
    },
  });

  // ==============================
  // 2️⃣ Create Categories
  // ==============================

  const tech = await prisma.category.create({
    data: { name: 'Technology' },
  });

  const backend = await prisma.category.create({
    data: { name: 'Backend' },
  });

  const frontend = await prisma.category.create({
    data: { name: 'Frontend' },
  });

  // ==============================
  // 3️⃣ Create Posts (with categories)
  // ==============================

  const post1 = await prisma.post.create({
    data: {
      title: 'Belajar Prisma',
      content: 'Prisma itu powerful ORM untuk Node.js',
      published: true,
      author: {
        connect: { id: user1.id },
      },
      categories: {
        connect: [{ id: tech.id }, { id: backend.id }],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Belajar React',
      content: 'React sangat populer untuk frontend',
      published: true,
      author: {
        connect: { id: user2.id },
      },
      categories: {
        connect: [{ id: tech.id }, { id: frontend.id }],
      },
    },
  });

  // ==============================
  // 4️⃣ Create Comments
  // ==============================

  await prisma.comment.createMany({
    data: [
      {
        content: 'Artikel yang sangat membantu!',
        userId: user2.id,
        postId: post1.id,
      },
      {
        content: 'Terima kasih sudah berbagi ',
        userId: user1.id,
        postId: post2.id,
      },
    ],
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
