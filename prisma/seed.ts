import { Cigar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cigarData: Cigar[] = [{
  name: 'TestCigar1',
  description: 'This is a test cigar description',
  id: 1,
  image: '',
  brand: '',
  humidorId: null,
  userId: 1
}, {
  name: 'TestCigar2',
  description: 'This is a test cigar description',
  id: 2,
  image: '',
  brand: '',
  humidorId: null,
  userId: 1
}, {
  name: 'TestCigar3',
  description: 'This is a test cigar description',
  id: 3,
  image: '',
  brand: '',
  humidorId: null,
  userId: 1
}]

async function createCigars() {
  for (const c of cigarData) {
    const cigar = await prisma.cigar.create({
      data: c,
    })
    console.log(`Created cigar with id: ${cigar.id}`)
  }
}

async function main() {
  console.log(`Start seeding ...`)
  await createCigars()
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
