import { dev } from '$app/environment';


import { sql } from '@vercel/postgres';
import type { VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/database/schema';
// import { drizzle as drizzlePG } from 'drizzle-orm/postgres-js';


let db: PostgresJsDatabase<typeof schema> | VercelPgDatabase<typeof schema>;

// Use Postgres
if (dev) {
    const drizzle = (await import('drizzle-orm/postgres-js')).drizzle;
    const postgres = (await import('postgres')).default;

    db = drizzle(postgres(process.env.PRIVATE_POSTGRES_URL_LOCAL as string), { schema });
}
// Use VercelPostgres
else {
    const drizzle = (await import('drizzle-orm/vercel-postgres')).drizzle;
    const sql = (await import('@vercel/postgres')).sql;

    db = drizzle(sql, { schema });
}

// const db = dev
//     ? drizzlePG(postgres(process.env.PRIVATE_POSTGRES_URL_LOCAL as string), { schema })
//     : drizzleVercelPG(sql, { schema })

export default db;
