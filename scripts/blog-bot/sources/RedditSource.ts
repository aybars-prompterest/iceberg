import type { IContentSource, Topic } from '../interfaces/IContentSource'
import type { RedditConfig } from '../config'

interface RedditPost {
  title: string
  url: string
  permalink: string
  selftext: string
  ups: number
  subreddit: string
}

interface RedditResponse {
  data: {
    children: Array<{ data: RedditPost }>
  }
}

export class RedditSource implements IContentSource {
  constructor(private readonly config: RedditConfig) {}

  async fetchTopics(): Promise<Topic[]> {
    const results = await Promise.all(
      this.config.subreddits.map(sub => this.fetchSubreddit(sub))
    )

    const allPosts = results.flat()
    const filtered = allPosts.filter(post =>
      post.upvotes > this.config.minUpvotes &&
      post.selftext !== '[removed]' &&
      post.selftext !== '[deleted]'
    )

    return filtered.sort((a, b) => b.upvotes - a.upvotes)
  }

  private async fetchSubreddit(subreddit: string): Promise<Topic[]> {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=15`
    const response = await fetch(url, {
      headers: { 'User-Agent': this.config.userAgent },
    })

    if (!response.ok) {
      console.warn(`Reddit fetch failed for r/${subreddit}: ${response.status}`)
      return []
    }

    const json = await response.json() as RedditResponse
    return json.data.children.map(child => ({
      url: `https://www.reddit.com${child.data.permalink}`,
      title: child.data.title,
      selftext: child.data.selftext,
      upvotes: child.data.ups,
      subreddit: child.data.subreddit,
    }))
  }
}
