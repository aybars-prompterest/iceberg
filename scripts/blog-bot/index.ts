import { RedditSource } from './sources/RedditSource'
import { HuggingFaceWriter } from './writers/HuggingFaceWriter'
import { DrizzleBlogRepository } from './repository/DrizzleBlogRepository'
import { BlogBot } from './orchestrator'
import { config } from './config'

if (!config.huggingface.apiKey) {
  console.error('❌ HUGGINGFACE_API_KEY environment variable is not set')
  process.exit(1)
}

const bot = new BlogBot(
  new RedditSource(config.reddit),
  new HuggingFaceWriter(config.huggingface),
  new DrizzleBlogRepository()
)

bot.run().catch((err: unknown) => {
  console.error('❌ BlogBot failed:', err)
  process.exit(1)
})
