import type { BlogContent } from './IAIWriter'
import type { Topic } from './IContentSource'

export interface IBlogRepository {
  save(content: BlogContent, topic: Topic): Promise<void>
  existsBySourceUrl(url: string): Promise<boolean>
}
