export const config = {
  reddit: {
    subreddits: [
      "technology",
      "programming",
      "artificial",
      "MachineLearning",
      "webdev",
    ],
    minUpvotes: 500,
    userAgent: process.env.REDDIT_USER_AGENT ?? "IcebergBot/1.0",
  },
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY ?? "",
    model: "Qwen/Qwen2.5-7B-Instruct",
  },
} as const;

export type RedditConfig = {
  subreddits: readonly string[];
  minUpvotes: number;
  userAgent: string;
};

export type HuggingFaceConfig = {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
};
