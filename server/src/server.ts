import 'dotenv/config'
import fastify from 'fastify'
import memoriesRoutes from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: '*',
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes, {
  prefix: '/auth',
})
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Running on 3333')
  })
