import { dev } from '$app/environment';
import { sql } from '@vercel/postgres';
import postgres from 'postgres';
import { drizzle as drizzleVercelPG } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzlePG } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/database/schema';

const db = dev
    ? drizzlePG(postgres(process.env.PRIVATE_POSTGRES_URL_LOCAL as string), { schema })
    : drizzleVercelPG(sql, { schema })

export default db;
