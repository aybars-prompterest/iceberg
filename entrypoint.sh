#!/bin/sh
set -e
node -e "
const { drizzle } = require('drizzle-orm/better-sqlite3');
const { migrate } = require('drizzle-orm/better-sqlite3/migrator');
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'blog.db');
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);
const migrationsFolder = path.join(process.cwd(), 'drizzle');
console.log('Running migrations from', migrationsFolder, 'on', dbPath);
migrate(db, { migrationsFolder });
console.log('Migrations complete');
sqlite.close();
"
exec node server.js
