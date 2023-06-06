import 'dotenv/config'
import fastify from 'fastify'
import memoriesRoutes from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifStatic from '@fastify/static'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(cors, {
  origin: '*',
})
app.register(multipart)
app.register(fastifStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(jwt, {
  secret: 'spacetime',
})

app.register(uploadRoutes)
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
