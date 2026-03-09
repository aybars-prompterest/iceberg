import { NextResponse } from 'next/server'
import { BlogBot } from '@scripts/blog-bot/orchestrator'
import { RedditSource } from '@scripts/blog-bot/sources/RedditSource'
import { HuggingFaceWriter } from '@scripts/blog-bot/writers/HuggingFaceWriter'
import { DrizzleBlogRepository } from '@scripts/blog-bot/repository/DrizzleBlogRepository'
import { config } from '@scripts/blog-bot/config'

export async function POST() {
  if (!config.huggingface.apiKey) {
    return NextResponse.json({ error: 'HUGGINGFACE_API_KEY is not set' }, { status: 500 })
  }

  try {
    const bot = new BlogBot(
      new RedditSource(config.reddit),
      new HuggingFaceWriter(config.huggingface),
      new DrizzleBlogRepository()
    )
    await bot.run()
    return NextResponse.json({ success: true, message: 'Bot çalıştırıldı' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen hata'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
