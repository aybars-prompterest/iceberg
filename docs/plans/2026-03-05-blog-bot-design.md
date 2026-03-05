# Blog Automation Bot — Design Document

**Date:** 2026-03-05
**Status:** Approved

## Overview

Automated pipeline that:
1. Fetches trending tech posts from Reddit (r/technology, r/programming, r/artificial, r/MachineLearning, r/webdev)
2. Generates a blog post using HuggingFace Inference API (Mistral-7B-Instruct-v0.3)
3. Saves to SQLite via Drizzle ORM
4. Next.js blog pages serve content from the same DB

## Architecture

### SOLID Principles Applied

- S: Each module has one responsibility (RedditSource, HuggingFaceWriter, DrizzleBlogRepository, BlogBot)
- O: New content sources implement IContentSource without modifying existing code
- L: Any IContentSource implementation can replace RedditSource
- I: Small focused interfaces (IContentSource, IAIWriter, IBlogRepository)
- D: BlogBot depends on abstractions, not concrete implementations

## Database Schema

blog_posts:
  id          INTEGER PRIMARY KEY AUTOINCREMENT
  slug        TEXT UNIQUE NOT NULL
  title       TEXT NOT NULL
  content     TEXT NOT NULL (Markdown)
  excerpt     TEXT NOT NULL
  category    TEXT NOT NULL
  tags        TEXT NOT NULL (JSON array)
  source_url  TEXT NOT NULL
  source_title TEXT NOT NULL
  upvotes     INTEGER NOT NULL
  created_at  INTEGER NOT NULL (Unix timestamp)

## Tech Stack

- ORM: Drizzle ORM + better-sqlite3
- AI: HuggingFace Inference API (Mistral-7B-Instruct-v0.3)
- Content source: Reddit JSON API (no auth)
- Markdown render: react-markdown
- Bot runtime: npx tsx scripts/blog-bot/index.ts

## Environment Variables

HUGGINGFACE_API_KEY=hf_xxx
REDDIT_USER_AGENT="IcebergBot/1.0 by your_reddit_username"
