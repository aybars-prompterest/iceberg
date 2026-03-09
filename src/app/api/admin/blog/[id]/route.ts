import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { title, content, excerpt, category } = body
  await db.update(blogPosts).set({ title, content, excerpt, category }).where(eq(blogPosts.id, Number(id)))
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)))
  return NextResponse.json({ success: true })
}
