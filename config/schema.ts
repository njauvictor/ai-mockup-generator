import { date, integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).notNull(),
  userInput: varchar().notNull(),
  designType: varchar().notNull(),
  platform: varchar().notNull(),
  userId: varchar().references(() => usersTable.email).notNull(),
  createdAt: date().defaultNow().notNull(),
  config: json()
});
