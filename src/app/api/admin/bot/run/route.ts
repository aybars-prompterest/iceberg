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
  const temperature = s.bot_temperature ? Number(s.bot_temperature) : undefined;
  const maxTokens = s.bot_max_tokens ? Number(s.bot_max_tokens) : undefined;
  const systemPrompt = s.bot_system_prompt || undefined;

  try {
    const source = new RedditSource({
      subreddits,
      minUpvotes,
      userAgent: process.env.REDDIT_USER_AGENT ?? "IcebergBot/1.0",
    });
    const writer = new HuggingFaceWriter({
      apiKey,
      model,
      temperature,
      maxTokens,
      systemPrompt,
    });
    const bot = new BlogBot(source, writer, new DrizzleBlogRepository());
    const result = await bot.run();

    // Save last run timestamp
    const now = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    });
    await db
      .insert(siteSettings)
      .values({ key: "bot_last_run", value: now })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: now } });

    if (result.status === "published") {
      return NextResponse.json({
        success: true,
        message: `Yeni yazı oluşturuldu: "${result.title}"`,
        title: result.title,
        slug: result.slug,
        topicsFound: result.topicsFound,
        skipped: result.skipped,
      });
    }

    const reason =
      result.status === "no_new"
        ? "Reddit'ten konu bulunamadı. Upvote eşiğini düşürmeyi veya subreddit'leri değiştirmeyi deneyin."
        : `Tüm konular zaten yayınlanmış (${result.skipped}/${result.topicsFound} atlandı).`;

    return NextResponse.json({ success: false, reason, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
