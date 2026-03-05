export interface Topic {
  url: string
  title: string
  selftext: string
  upvotes: number
  subreddit: string
}

export interface IContentSource {
  fetchTopics(): Promise<Topic[]>
}
