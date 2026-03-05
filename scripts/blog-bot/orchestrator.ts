import type { IContentSource } from './interfaces/IContentSource'
import type { IAIWriter } from './interfaces/IAIWriter'
import type { IBlogRepository } from './interfaces/IBlogRepository'

export class BlogBot {
  constructor(
    private readonly source: IContentSource,
    private readonly writer: IAIWriter,
    private readonly repo: IBlogRepository
  ) {}

  async run(): Promise<void> {
    console.log('🤖 BlogBot starting...')

    console.log('📡 Fetching topics from Reddit...')
    const topics = await this.source.fetchTopics()
    console.log(`   Found ${topics.length} topics`)

    for (const topic of topics) {
      const exists = await this.repo.existsBySourceUrl(topic.url)
      if (exists) {
        console.log(`   Skipping (already published): ${topic.title.slice(0, 60)}`)
        continue
      }

      console.log(`✍️  Writing blog post for: ${topic.title.slice(0, 60)}...`)
      const content = await this.writer.write(topic)

      await this.repo.save(content, topic)
      console.log(`✅ Published: "${content.title}"`)
      console.log(`   Slug: ${content.slug}`)
      console.log(`   Tags: ${content.tags.join(', ')}`)
      return // one post per run
    }

    console.log('ℹ️  No new topics found today.')
  }
}
