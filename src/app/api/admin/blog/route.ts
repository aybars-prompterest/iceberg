import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
  return NextResponse.json(posts)
}
