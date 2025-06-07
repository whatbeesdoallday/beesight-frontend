import { pgTable, text, serial, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
});

export const beeStatistics = pgTable("bee_statistics", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  beeCount: integer("bee_count").notNull(),
  activityLevel: text("activity_level").notNull(),
  temperature: real("temperature"),
  humidity: real("humidity"),
  windSpeed: real("wind_speed"),
});

export const beeActivities = pgTable("bee_activities", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  activityType: text("activity_type").notNull(),
  description: text("description").notNull(),
  beeCount: integer("bee_count"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertBeeStatisticsSchema = createInsertSchema(beeStatistics).omit({
  id: true,
});

export const insertBeeActivitiesSchema = createInsertSchema(beeActivities).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertBeeStatistics = z.infer<typeof insertBeeStatisticsSchema>;
export type BeeStatistics = typeof beeStatistics.$inferSelect;

export type InsertBeeActivities = z.infer<typeof insertBeeActivitiesSchema>;
export type BeeActivities = typeof beeActivities.$inferSelect;
