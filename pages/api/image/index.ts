
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')

  if (!key) {
    return NextResponse.next()
  }

  const response = await fetch(`https://assets.vercel.com/${key}`)
  return NextResponse.next(response)

}
