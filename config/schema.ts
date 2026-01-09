import { th } from "date-fns/locale";
import { date, integer, pgTable, varchar, json, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).notNull(),
  projectName: varchar(),
  theme: varchar(),
  userInput: varchar().notNull(),
  designType: varchar().notNull(),
  platform: varchar().notNull(),
  userId: varchar().references(() => usersTable.email).notNull(),
  createdAt: date().defaultNow().notNull(),
  config: json()
});


export const ScreenConfigTable = pgTable("screenConfig", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), 
  projectId: varchar().references(() => projectsTable.projectId),
  screenId: varchar(),
  screenName: varchar(),
  purpose: varchar(),
  screenDescription: varchar(),
  code: text(),
});