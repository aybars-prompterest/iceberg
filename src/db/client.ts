import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'
import * as schema from './schema'

// DATABASE_PATH can be set in .env.local to override the default location
const dbPath = process.env.DATABASE_PATH ?? path.join(process.cwd(), 'blog.db')
const sqlite = new Database(dbPath)
export const db = drizzle(sqlite, { schema })
