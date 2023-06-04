import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const registerRes = await api.post('/auth/register', { code })

  const { token } = registerRes.data

  const redirectUrl = new URL('/', req.url)

  const expiresIn = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${expiresIn};`,
    },
  })
}
