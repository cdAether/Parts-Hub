import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('records', { id: text('id').primaryKey(), owner: text('owner').notNull(), kind: text('kind').notNull(), body: text('body').notNull(), revision: integer('revision').notNull().default(1), updated: text('updated').notNull() });
export const revisions = sqliteTable('revisions', { id: text('id').primaryKey(), recordId: text('record_id').notNull(), owner: text('owner').notNull(), body: text('body').notNull(), revision: integer('revision').notNull(), created: text('created').notNull() });
