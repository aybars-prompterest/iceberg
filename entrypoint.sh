#!/bin/sh
set -e

node -e "
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'blog.db');
const migrationsFolder = path.join(process.cwd(), 'drizzle');

console.log('Running migrations on', dbPath);
const sqlite = new Database(dbPath);

sqlite.exec(\`
  CREATE TABLE IF NOT EXISTS __drizzle_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hash TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL
  )
\`);

const journal = JSON.parse(fs.readFileSync(path.join(migrationsFolder, 'meta/_journal.json'), 'utf8'));
const applied = new Set(sqlite.prepare('SELECT hash FROM __drizzle_migrations').all().map(r => r.hash));

for (const entry of journal.entries) {
  if (applied.has(entry.tag)) continue;
  const sql = fs.readFileSync(path.join(migrationsFolder, entry.tag + '.sql'), 'utf8');
  const statements = sql.split('--> statement-breakpoint');
  for (const stmt of statements) {
    const trimmed = stmt.trim();
    if (trimmed) sqlite.exec(trimmed);
  }
  sqlite.prepare('INSERT INTO __drizzle_migrations (hash, created_at) VALUES (?, ?)').run(entry.tag, Date.now());
  console.log('Applied:', entry.tag);
}

console.log('Migrations complete');
sqlite.close();
"

exec node server.js
