import type { IContentSource, Topic } from "../interfaces/IContentSource";
import type { GoogleNewsConfig } from "../config";

export class GoogleNewsSource implements IContentSource {
  constructor(private readonly config: GoogleNewsConfig) {}

  async fetchTopics(): Promise<Topic[]> {
    const results = await Promise.all(
      this.config.queries.map((q) => this.fetchQuery(q)),
    );
    return results.flat();
  }

  private async fetchQuery(query: string): Promise<Topic[]> {
    const encoded = encodeURIComponent(query);
    const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; IcebergBot/1.0)" },
      });
      if (!response.ok) {
        console.warn(
          `Google News fetch failed for "${query}": ${response.status}`,
        );
        return [];
      }
      const xml = await response.text();
      return this.parseRSS(xml, query);
    } catch (err) {
      console.warn(`Google News fetch error for "${query}":`, err);
      return [];
    }
  }

  private parseRSS(xml: string, query: string): Topic[] {
    const items: Topic[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];
      const title = this.extractTag(block, "title");
      const link = this.extractTag(block, "link");
      const description = this.extractTag(block, "description");

      if (title && link) {
        items.push({
          url: link,
          title: this.decodeEntities(title),
          selftext: this.decodeEntities(description ?? ""),
          upvotes: 0,
          subreddit: query,
        });
      }
    }

    return items.slice(0, this.config.maxPerQuery ?? 10);
  }

  private extractTag(xml: string, tag: string): string | null {
    const cdataMatch = xml.match(
      new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`),
    );
    if (cdataMatch) return cdataMatch[1] ?? null;
    const plainMatch = xml.match(
      new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`),
    );
    return plainMatch ? (plainMatch[1] ?? null) : null;
  }

  private decodeEntities(str: string): string {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
}
