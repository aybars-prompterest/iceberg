import { NextResponse } from "next/server";
import { BlogBot } from "@scripts/blog-bot/orchestrator";
import { RedditSource } from "@scripts/blog-bot/sources/RedditSource";
import { HuggingFaceWriter } from "@scripts/blog-bot/writers/HuggingFaceWriter";
import { DrizzleBlogRepository } from "@scripts/blog-bot/repository/DrizzleBlogRepository";
import { db } from "@/db/client";
import { siteSettings } from "@/db/schema";

export async function POST() {
  const apiKey = process.env.HUGGINGFACE_API_KEY ?? "";
  if (!apiKey) {
    return NextResponse.json(
      { error: "HUGGINGFACE_API_KEY is not set" },
      { status: 500 },
    );
  }

  const rows = await db.select().from(siteSettings);
  const s: Record<string, string> = {};
  for (const row of rows) s[row.key] = row.value;

  const subreddits = s.bot_subreddits
    ? s.bot_subreddits
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean)
    : ["technology", "programming", "artificial", "MachineLearning", "webdev"];
  const minUpvotes = s.bot_min_upvotes ? Number(s.bot_min_upvotes) : 500;
  const model = s.bot_model || "Qwen/Qwen2.5-7B-Instruct";

  try {
    // @ts-expect-error - config.ts uses `as const` literal types; runtime values are compatible
    const source = new RedditSource({ subreddits, minUpvotes, userAgent: process.env.REDDIT_USER_AGENT ?? "IcebergBot/1.0" });
    // @ts-expect-error - config.ts uses `as const` literal types; runtime values are compatible
    const writer = new HuggingFaceWriter({ apiKey, model });
    const bot = new BlogBot(source, writer, new DrizzleBlogRepository());
    await bot.run();
    return NextResponse.json({ success: true, message: "Bot çalıştırıldı" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
