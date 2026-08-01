import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let globalClient: ReturnType<typeof createClient>;

export type Database = ReturnType<typeof createClient>;

export function createClient(connectionString: string) {
  const client = postgres(connectionString, {
    prepare: true,
    max: 10, // connection pool size
  });

  return drizzle(client, { schema });
}

/**
 * Get or create a global database client.
 * Used for server-side operations, Workers, and dbt scripts.
 * Environment variable: DATABASE_URL (full Postgres connection string)
 */
export function getDbClient(): Database {
  if (!globalClient) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    globalClient = createClient(dbUrl);
  }
  return globalClient;
}
