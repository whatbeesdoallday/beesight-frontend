import { products, beeStatistics, beeActivities, type Product, type InsertProduct, type BeeStatistics, type InsertBeeStatistics, type BeeActivities, type InsertBeeActivities } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Bee Statistics
  getBeeStatistics(): Promise<BeeStatistics[]>;
  getLatestBeeStatistics(): Promise<BeeStatistics | undefined>;
  createBeeStatistics(stats: InsertBeeStatistics): Promise<BeeStatistics>;
  
  // Bee Activities
  getBeeActivities(limit?: number): Promise<BeeActivities[]>;
  createBeeActivity(activity: InsertBeeActivities): Promise<BeeActivities>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private beeStatistics: Map<number, BeeStatistics>;
  private beeActivities: Map<number, BeeActivities>;
  private currentProductId: number;
  private currentStatsId: number;
  private currentActivityId: number;

  constructor() {
    this.products = new Map();
    this.beeStatistics = new Map();
    this.beeActivities = new Map();
    this.currentProductId = 1;
    this.currentStatsId = 1;
    this.currentActivityId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed products
    const seedProducts: InsertProduct[] = [
      {
        name: "Raw Wildflower Honey",
        description: "Pure, unfiltered honey from our local wildflower meadows. Rich, complex flavor with notes of clover and basswood.",
        price: 24.99,
        category: "honey",
        imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      },
      {
        name: "Buckwheat Honey",
        description: "Dark, robust honey with a distinctive malty flavor. High in antioxidants and minerals.",
        price: 28.99,
        category: "honey",
        imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      },
      {
        name: "Bee-Friendly Wildflower Mix",
        description: "Specially selected native wildflower seeds that provide excellent forage for bees and pollinators.",
        price: 12.99,
        category: "seeds",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      },
      {
        name: "Comb Honey",
        description: "Honey straight from the comb with edible beeswax. The most natural form of honey available.",
        price: 34.99,
        category: "honey",
        imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      },
      {
        name: "Native Pollinator Seeds",
        description: "Regional native plants including bee balm, purple coneflower, and black-eyed susan.",
        price: 18.99,
        category: "seeds",
        imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      },
      {
        name: "Honey Tasting Set",
        description: "Curated selection of three unique honey varieties with tasting notes and wooden dipper.",
        price: 64.99,
        category: "honey",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true
      }
    ];

    seedProducts.forEach(product => {
      this.createProduct(product);
    });

    // Seed bee statistics - recent data points
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly data for last 24 hours
      const hour = timestamp.getHours();
      let beeCount = 0;
      let activityLevel = "low";
      
      // Simulate realistic bee activity patterns
      if (hour >= 6 && hour <= 8) { // Morning rush
        beeCount = Math.floor(Math.random() * 30) + 20;
        activityLevel = "medium";
      } else if (hour >= 9 && hour <= 16) { // Peak activity
        beeCount = Math.floor(Math.random() * 50) + 40;
        activityLevel = hour >= 11 && hour <= 14 ? "high" : "medium";
      } else if (hour >= 17 && hour <= 19) { // Evening return
        beeCount = Math.floor(Math.random() * 35) + 25;
        activityLevel = "medium";
      } else { // Night/early morning
        beeCount = Math.floor(Math.random() * 15) + 5;
        activityLevel = "low";
      }

      this.createBeeStatistics({
        timestamp,
        beeCount,
        activityLevel,
        temperature: 18 + Math.random() * 12, // 18-30°C
        humidity: 40 + Math.random() * 30, // 40-70%
        windSpeed: Math.random() * 15 // 0-15 km/h
      });
    }

    // Seed recent bee activities
    const activities = [
      { type: "peak_activity", desc: "Peak activity detected - 67 bees/minute", count: 67 },
      { type: "foraging", desc: "Foraging group returned with pollen", count: 15 },
      { type: "communication", desc: "Communication dance observed", count: 3 },
      { type: "temperature_control", desc: "Wing fanning for temperature control", count: 8 },
      { type: "guard_duty", desc: "Guard bees active at entrance", count: 5 }
    ];

    activities.forEach((activity, index) => {
      this.createBeeActivity({
        timestamp: new Date(now.getTime() - (index * 5 * 60 * 1000)), // 5 minutes apart
        activityType: activity.type,
        description: activity.desc,
        beeCount: activity.count
      });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getBeeStatistics(): Promise<BeeStatistics[]> {
    return Array.from(this.beeStatistics.values()).sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  async getLatestBeeStatistics(): Promise<BeeStatistics | undefined> {
    const stats = Array.from(this.beeStatistics.values());
    return stats.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  }

  async createBeeStatistics(insertStats: InsertBeeStatistics): Promise<BeeStatistics> {
    const id = this.currentStatsId++;
    const stats: BeeStatistics = { ...insertStats, id };
    this.beeStatistics.set(id, stats);
    return stats;
  }

  async getBeeActivities(limit: number = 10): Promise<BeeActivities[]> {
    const activities = Array.from(this.beeActivities.values());
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createBeeActivity(insertActivity: InsertBeeActivities): Promise<BeeActivities> {
    const id = this.currentActivityId++;
    const activity: BeeActivities = { ...insertActivity, id };
    this.beeActivities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
