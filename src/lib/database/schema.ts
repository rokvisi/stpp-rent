import { timestamp, varchar, serial, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const pgUsers = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	password: text('password').notNull()
});
export type User = typeof pgUsers.$inferSelect; // return type when queried
export type NewUser = typeof pgUsers.$inferInsert; // insert type
export const insertUserSchema = createInsertSchema(pgUsers);
