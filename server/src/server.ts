import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const app = fastify()
const prisma = new PrismaClient()

app.get('/hello', async () => {
  const users = await prisma.user.findMany()

  return 'hello world'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Running on 3333')
  })