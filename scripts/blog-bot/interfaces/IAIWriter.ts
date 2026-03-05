import type { Topic } from './IContentSource'

export interface BlogContent {
  slug: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
}

export interface IAIWriter {
  write(topic: Topic): Promise<BlogContent>
}
