import { relations } from 'drizzle-orm';
import { timestamp, serial, pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const pgUsers = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	role: text('role').notNull()
});
export const pgUsersRelations = relations(pgUsers, ({ many }) => ({
	houses: many(pgHouses),
	contracts: many(pgContracts),
	refreshTokens: many(pgRefreshTokens)
}))
export type User = typeof pgUsers.$inferSelect;
export type NewUser = typeof pgUsers.$inferInsert;
export const insertUserSchema = createInsertSchema(pgUsers);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgHouses = pgTable('houses', {
	id: serial('id').primaryKey().notNull(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	name: text('name').notNull(),
	region: text('region').notNull(),
	district: text('district').notNull(),
	image_url: text('image_url').notNull(),
	wifi_speed: integer("wifi_speed"),
	location_description: text('location_description').notNull(),
	fk_renter: integer("fk_renter").notNull().references(() => pgUsers.id, { onDelete: 'cascade' })
});
export const pgHousesRelations = relations(pgHouses, ({ one, many }) => ({
	renter: one(pgUsers, {
		fields: [pgHouses.fk_renter],
		references: [pgUsers.id]
	}),
	rooms: many(pgRooms),
	commonAreas: many(pgCommonAreas),
	houseLocationNotes: many(pgHouseLocationNotes)
}))
export type House = typeof pgHouses.$inferSelect;
export type NewHouse = typeof pgHouses.$inferInsert;
export const insertHouseSchema = createInsertSchema(pgHouses);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgHouseLocationNotes = pgTable('house_location_notes', {
	id: serial('id').primaryKey().notNull(),
	note: text('note').notNull(),
	fk_house: integer("fk_house").notNull().references(() => pgHouses.id, { onDelete: 'cascade' })
});
export const pgHouseLocationNotesRelations = relations(pgHouseLocationNotes, ({ one }) => ({
	house: one(pgHouses, {
		fields: [pgHouseLocationNotes.fk_house],
		references: [pgHouses.id]
	}),
}))
export type HouseLocationNote = typeof pgHouseLocationNotes.$inferSelect;
export type NewHouseLocationNote = typeof pgHouseLocationNotes.$inferInsert;
export const insertHouseLocationNoteSchema = createInsertSchema(pgHouseLocationNotes);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgRooms = pgTable('rooms', {
	id: serial('id').primaryKey().notNull(),
	number: integer('number').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	fk_house: integer("fk_house").notNull().references(() => pgHouses.id, { onDelete: 'cascade' })
});
export const pgRoomsRelations = relations(pgRooms, ({ one, many }) => ({
	contracts: many(pgContracts),
	images: many(pgRoomImages),
	notes: many(pgRoomNotes),
	house: one(pgHouses, {
		fields: [pgRooms.fk_house],
		references: [pgHouses.id]
	}),
}))
export type Room = typeof pgRooms.$inferSelect;
export type NewRoom = typeof pgRooms.$inferInsert;
export const insertRoomSchema = createInsertSchema(pgRooms);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgRoomNotes = pgTable('room_notes', {
	id: serial('id').primaryKey().notNull(),
	note: text('note').notNull(),
	fk_room: integer("fk_room").notNull().references(() => pgRooms.id, { onDelete: 'cascade' })
});
export const pgRoomNotesRelations = relations(pgRoomNotes, ({ one }) => ({
	room: one(pgRooms, {
		fields: [pgRoomNotes.fk_room],
		references: [pgRooms.id]
	}),
}))
export type RoomNote = typeof pgRoomNotes.$inferSelect;
export type NewRoomNote = typeof pgRoomNotes.$inferInsert;
export const insertRoomNoteSchema = createInsertSchema(pgRoomNotes);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgRoomImages = pgTable('room_images', {
	id: serial('id').primaryKey().notNull(),
	url: text('url').notNull(),
	fk_room: integer("fk_room").notNull().references(() => pgRooms.id, { onDelete: 'cascade' })
});
export const pgRoomImagesRelations = relations(pgRoomImages, ({ one }) => ({
	room: one(pgRooms, {
		fields: [pgRoomImages.fk_room],
		references: [pgRooms.id]
	}),
}))
export type RoomImage = typeof pgRoomImages.$inferSelect;
export type NewRoomImage = typeof pgRoomImages.$inferInsert;
export const insertRoomImageSchema = createInsertSchema(pgRoomImages);


//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgCommonAreas = pgTable('common_areas', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull(),
	fk_house: integer("fk_house").notNull().references(() => pgHouses.id, { onDelete: 'cascade' })
});
export const pgCommonAreasRelations = relations(pgCommonAreas, ({ one, many }) => ({
	house: one(pgHouses, {
		fields: [pgCommonAreas.fk_house],
		references: [pgHouses.id]
	}),
	images: many(pgCommonAreaImages)
}))
export type CommonArea = typeof pgCommonAreas.$inferSelect;
export type NewCommonArea = typeof pgCommonAreas.$inferInsert;
export const insertCommonAreaSchema = createInsertSchema(pgCommonAreas);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgCommonAreaImages = pgTable('common_area_images', {
	id: serial('id').primaryKey().notNull(),
	url: text('url').notNull(),
	fk_common_area: integer("fk_common_area").notNull().references(() => pgCommonAreas.id, { onDelete: 'cascade' })
});
export const pgCommonAreaImagesRelations = relations(pgCommonAreaImages, ({ one }) => ({
	commonArea: one(pgCommonAreas, {
		fields: [pgCommonAreaImages.fk_common_area],
		references: [pgCommonAreas.id]
	}),
}))
export type CommonAreaImage = typeof pgCommonAreaImages.$inferSelect;
export type NewCommonAreaImage = typeof pgCommonAreaImages.$inferInsert;
export const insertCommonAreaImageSchema = createInsertSchema(pgCommonAreaImages);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgContracts = pgTable('contracts', {
	id: serial('id').primaryKey().notNull(),
	start_date: timestamp('start_date').defaultNow().notNull(),
	end_date: timestamp('end_date'),
	fk_room: integer("fk_room").notNull().references(() => pgRooms.id, { onDelete: 'cascade' }),
	fk_rentee: integer("fk_rentee").notNull().references(() => pgUsers.id, { onDelete: 'cascade' })
});
export const pgContractsRelations = relations(pgContracts, ({ one }) => ({
	rentee: one(pgUsers, {
		fields: [pgContracts.fk_rentee],
		references: [pgUsers.id]
	}),
	room: one(pgRooms, {
		fields: [pgContracts.fk_room],
		references: [pgRooms.id]
	}),
}))
export type Contract = typeof pgContracts.$inferSelect;
export type NewContract = typeof pgContracts.$inferInsert;
export const insertContractSchema = createInsertSchema(pgContracts);

//* ----------------------------------------------------------------------
//* ----------------------------------------------------------------------

export const pgRefreshTokens = pgTable('refresh_tokens', {
	id: serial('id').primaryKey().notNull(),
	token: text("token").notNull(),
	fk_user: integer("fk_user").notNull().references(() => pgUsers.id, { onDelete: 'cascade' })
});
export const pgRefreshTokensRelations = relations(pgRefreshTokens, ({ one }) => ({
	user: one(pgUsers, {
		fields: [pgRefreshTokens.fk_user],
		references: [pgUsers.id]
	}),
}))
export type RefreshToken = typeof pgRefreshTokens.$inferSelect;
export type NewRefreshToken = typeof pgRefreshTokens.$inferInsert;
export const insertRefreshTokenSchema = createInsertSchema(pgRefreshTokens);
