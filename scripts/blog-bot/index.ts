import { RedditSource } from "./sources/RedditSource";
import { HuggingFaceWriter } from "./writers/HuggingFaceWriter";
import { DrizzleBlogRepository } from "./repository/DrizzleBlogRepository";
import { BlogBot } from "./orchestrator";
import { config } from "./config";
import { db } from "../../src/db/client";
import { siteSettings } from "../../src/db/schema";

if (!config.huggingface.apiKey) {
  console.error("❌ HUGGINGFACE_API_KEY environment variable is not set");
  process.exit(1);
}

async function getIntervalMs(): Promise<number> {
  try {
    const rows = await db.select().from(siteSettings);
    const s: Record<string, string> = {};
    for (const row of rows) s[row.key] = row.value;
    const hours = s.bot_interval_hours
      ? Number(s.bot_interval_hours)
      : Number(process.env.BOT_INTERVAL_HOURS ?? 24);
    return hours * 60 * 60 * 1000;
  } catch {
    return Number(process.env.BOT_INTERVAL_HOURS ?? 24) * 60 * 60 * 1000;
  }
}

const bot = new BlogBot(
  new RedditSource(config.reddit),
  new HuggingFaceWriter(config.huggingface),
  new DrizzleBlogRepository(),
);

async function runLoop() {
  while (true) {
    console.log(`🕐 [${new Date().toISOString()}] Running bot...`);
    try {
      await bot.run();
    } catch (err: unknown) {
      console.error("❌ BlogBot failed:", err);
    }
    const intervalMs = await getIntervalMs();
    const hours = intervalMs / 3600000;
    console.log(`⏳ Next run in ${hours} hours.`);
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

runLoop();
