import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
 const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


type SelectUser = InferSelectModel<typeof usersTable>;
type InsertUser = InferInsertModel<typeof usersTable>;

export {usersTable,SelectUser,InsertUser}