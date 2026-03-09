import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.DATABASE_PATH ?? path.join(process.cwd(), "blog.db");
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

const migrationsFolder = path.join(process.cwd(), "drizzle");
console.log(`Running migrations from ${migrationsFolder} on ${dbPath}`);
migrate(db, { migrationsFolder });
console.log("Migrations complete");
sqlite.close();
