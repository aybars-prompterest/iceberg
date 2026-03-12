import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { inArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { ids } = body as { ids: number[] }

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'Geçersiz ID listesi' }, { status: 400 })
  }

  await db.delete(blogPosts).where(inArray(blogPosts.id, ids))
  return NextResponse.json({ success: true, deleted: ids.length })
}
