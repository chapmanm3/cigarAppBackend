import { Cigar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cigarData: Cigar[] = [{
  name: 'TestCigar1',
  description: 'This is a test cigar description',
  id: 1,
  image: ''
}, {
  name: 'TestCigar2',
  description: 'This is a test cigar description',
  id: 2,
  image: ''
}, {
  name: 'TestCigar3',
  description: 'This is a test cigar description',
  id: 3,
  image: ''
}]

async function main() {
  console.log(`Start seeding ...`)
  for (const c of cigarData) {
    const cigar = await prisma.cigar.create({
      data: c,
    })
    console.log(`Created cigar with id: ${cigar.id}`)
  }
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
