import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const certotsTable = sqliteTable("certots", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  story: text("story").notNull(),
  promptsId: integer("prompts_id")
    .notNull()
    .references(() => promptsTable.id, { onDelete: "cascade" }),
});

export type SelectCertot = typeof certotsTable.$inferSelect;

export const promptsTable = sqliteTable("prompts", {
  id: integer("id").primaryKey(),
  prompts: text("prompts", { mode: "json" }).notNull().$type<string[]>(),
  userId: integer("user_id").notNull(),
});

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: false }),
  name: text("name").notNull(),
  image: text("image").notNull(),
  username: text("username").notNull(),
  apiKey: text("api_key").notNull(),
});
