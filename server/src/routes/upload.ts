import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, reply) => {
    const file = await req.file({
      limits: {
        fileSize: 1024 * 1024 * 20, // 20mb
      },
    })

    if (!file) return reply.status(400).send()

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFileFormat) return reply.status(400).send()

    const fileId = randomUUID()
    const fileExtName = extname(file.filename)

    const fileName = `${fileId}${fileExtName}`

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName)
    )

    await pump(file.file, writeStream)

    const baseUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, baseUrl).toString()

    return {
      fileUrl,
    }
  })
}
