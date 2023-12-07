// Local db connection.
import postgres from 'postgres';
import { drizzle as drizzlePG } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/database/schema';

const db = drizzlePG(postgres(process.env.PRIVATE_POSTGRES_URL_LOCAL as string), { schema });
export default db;

// Deployment db connection.
// import { sql } from '@vercel/postgres';
// import { drizzle as drizzleVercelPG } from 'drizzle-orm/vercel-postgres';
// import * as schema from '$lib/database/schema';

// const db = drizzleVercelPG(sql, { schema })
// export default db;
