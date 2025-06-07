import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertBeeStatisticsSchema, insertBeeActivitiesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid product data", errors: result.error.issues });
      }
      const product = await storage.createProduct(result.data);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Bee statistics routes
  app.get("/api/bee-statistics", async (req, res) => {
    try {
      const statistics = await storage.getBeeStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bee statistics" });
    }
  });

  app.get("/api/bee-statistics/latest", async (req, res) => {
    try {
      const latest = await storage.getLatestBeeStatistics();
      if (!latest) {
        return res.status(404).json({ message: "No statistics available" });
      }
      res.json(latest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest statistics" });
    }
  });

  app.post("/api/bee-statistics", async (req, res) => {
    try {
      const result = insertBeeStatisticsSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid statistics data", errors: result.error.issues });
      }
      const stats = await storage.createBeeStatistics(result.data);
      res.status(201).json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to create statistics" });
    }
  });

  // Bee activities routes
  app.get("/api/bee-activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getBeeActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bee activities" });
    }
  });

  app.post("/api/bee-activities", async (req, res) => {
    try {
      const result = insertBeeActivitiesSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid activity data", errors: result.error.issues });
      }
      const activity = await storage.createBeeActivity(result.data);
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
