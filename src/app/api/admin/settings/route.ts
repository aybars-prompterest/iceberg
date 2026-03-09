import { db } from '@/db/client'
import { siteSettings } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const rows = await db.select().from(siteSettings)
  const settings: Record<string, string> = {}
  for (const row of rows) settings[row.key] = row.value
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const body: Record<string, string> = await req.json()
  for (const [key, value] of Object.entries(body)) {
    await db.insert(siteSettings).values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value } })
  }
  return NextResponse.json({ success: true })
}
