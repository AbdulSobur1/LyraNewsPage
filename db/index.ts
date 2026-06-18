import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Lazy database connection — does not throw if DATABASE_URL is missing.
 * Importing this module is safe at build time.
 * Call `getDb()` at runtime to obtain the Drizzle instance.
 * Returns null if the database isn't configured.
 */
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;
let dbInitialized = false;

export function getDb() {
  if (dbInitialized) return dbInstance;
  dbInitialized = true;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(
      "[db] DATABASE_URL is not defined. Skipping database initialization.",
    );
    return null;
  }

  try {
    const sql = neon(connectionString);
    dbInstance = drizzle(sql, { schema });
  } catch (e) {
    console.error("[db] Failed to initialize database:", e);
  }

  return dbInstance;
}

export { schema };
