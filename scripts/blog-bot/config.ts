export const config = {
  reddit: {
    subreddits: ['technology', 'programming', 'artificial', 'MachineLearning', 'webdev'],
    minUpvotes: 500,
    userAgent: process.env.REDDIT_USER_AGENT ?? 'IcebergBot/1.0',
  },
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY ?? '',
    model: 'mistralai/Mistral-7B-Instruct-v0.3',
  },
} as const

export type RedditConfig = typeof config.reddit
export type HuggingFaceConfig = typeof config.huggingface
