import { HfInference } from '@huggingface/inference'
import type { IAIWriter, BlogContent } from '../interfaces/IAIWriter'
import type { Topic } from '../interfaces/IContentSource'
import type { HuggingFaceConfig } from '../config'

function generateSlug(title: string): string {
  const date = new Date().toISOString().split('T')[0]
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '')
  return `${slug}-${date}`
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled Post'
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!')) {
      return trimmed.slice(0, 200)
    }
  }
  return content.slice(0, 200)
}

function parseTags(raw: string): string[] {
  try {
    const match = raw.match(/\[.*\]/)
    if (match) return JSON.parse(match[0]) as string[]
  } catch {}
  return ['Technology']
}

function parseCategory(raw: string): string {
  const match = raw.match(/CATEGORY:\s*(\w+)/i)
  return match ? match[1] : 'Technology'
}

export class HuggingFaceWriter implements IAIWriter {
  private readonly hf: HfInference

  constructor(private readonly config: HuggingFaceConfig) {
    this.hf = new HfInference(config.apiKey)
  }

  async write(topic: Topic): Promise<BlogContent> {
    const context = topic.selftext.length > 20 ? topic.selftext.slice(0, 500) : 'No additional context'

    const prompt = `[INST] You are a professional technical blog writer. Write a detailed, engaging blog post based on this trending topic from Reddit.

Topic: ${topic.title}
Context from Reddit discussion: ${context}

Requirements:
- Write approximately 800 words
- Format: Markdown
- Start with a compelling H1 title (e.g., # Your Title Here)
- Include 3-4 sections with H2 headers
- End with a Conclusion section
- Tone: Professional but approachable, informative
- After the blog post, on a new line, write: TAGS: followed by a JSON array of 3-5 relevant tags, e.g.: TAGS: ["AI", "Machine Learning", "Python"]
- After tags, write: CATEGORY: followed by one category word, e.g.: CATEGORY: AI

Do not include any meta-commentary. Just write the blog post directly. [/INST]`

    let rawResponse = ''

    const stream = this.hf.textGenerationStream({
      model: this.config.model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1200,
        temperature: 0.7,
        do_sample: true,
      },
    })

    for await (const chunk of stream) {
      rawResponse += chunk.token.text
    }

    // Split out metadata
    const tagsIndex = rawResponse.indexOf('TAGS:')
    const blogContent = tagsIndex > -1 ? rawResponse.slice(0, tagsIndex).trim() : rawResponse.trim()
    const metaPart = tagsIndex > -1 ? rawResponse.slice(tagsIndex) : ''

    const title = extractTitle(blogContent)
    const excerpt = extractExcerpt(blogContent)
    const tags = parseTags(metaPart)
    const category = parseCategory(metaPart)
    const slug = generateSlug(title)

    return {
      slug,
      title,
      content: blogContent,
      excerpt,
      category,
      tags,
    }
  }
}
