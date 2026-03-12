import type { IContentSource } from './interfaces/IContentSource'
import type { IAIWriter } from './interfaces/IAIWriter'
import type { IBlogRepository } from './interfaces/IBlogRepository'

export interface BotResult {
  status: 'published' | 'no_new' | 'all_skipped' | 'error'
  title?: string
  slug?: string
  topicsFound: number
  skipped: number
  error?: string
}

export class BlogBot {
  constructor(
    private readonly source: IContentSource,
    private readonly writer: IAIWriter,
    private readonly repo: IBlogRepository
  ) {}

  async run(): Promise<BotResult> {
    console.log('🤖 BlogBot starting...')

    console.log('📡 Fetching topics from Reddit...')
    const topics = await this.source.fetchTopics()
    console.log(`   Found ${topics.length} topics`)

    if (topics.length === 0) {
      console.log('ℹ️  No topics found from Reddit.')
      return { status: 'no_new', topicsFound: 0, skipped: 0 }
    }

    let skipped = 0

    for (const topic of topics) {
      const exists = await this.repo.existsBySourceUrl(topic.url)
      if (exists) {
        console.log(`   Skipping (already published): ${topic.title.slice(0, 60)}`)
        skipped++
        continue
      }

      try {
        console.log(`✍️  Writing blog post for: ${topic.title.slice(0, 60)}...`)
        const content = await this.writer.write(topic)
        await this.repo.save(content, topic)
        console.log(`✅ Published: "${content.title}"`)
        console.log(`   Slug: ${content.slug}`)
        console.log(`   Tags: ${content.tags.join(', ')}`)
        return { status: 'published', title: content.title, slug: content.slug, topicsFound: topics.length, skipped }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.warn(`   Failed to process topic "${topic.title.slice(0, 60)}":`, message)
      }
    }

    console.log('ℹ️  No new topics found today.')
    return { status: 'all_skipped', topicsFound: topics.length, skipped }
  }
}
