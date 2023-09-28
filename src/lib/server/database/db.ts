import { dev } from '$app/environment';
import { sql } from '@vercel/postgres';
import postgres from 'postgres';
import { drizzle as drizzleVercelPG } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzlePG } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/database/schema';
import { PRIVATE_POSTGRES_URL_LOCAL } from '$env/static/private';

const db = dev
    ? drizzlePG(postgres(PRIVATE_POSTGRES_URL_LOCAL), { schema })
    : drizzleVercelPG(sql, { schema })

export default db;
