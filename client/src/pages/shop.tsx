import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cart, setCart] = useState<number[]>([]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.filter(product => 
    categoryFilter === "all" || product.category === categoryFilter
  ) || [];

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const cartCount = cart.length;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-honey-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">Bee Products Shop</h1>
        <p className="text-xl text-gray-600">Fresh honey and wildflower seeds from our apiary</p>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm sticky top-24">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Filter Products</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="category" 
                        value="all" 
                        checked={categoryFilter === "all"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-honey-500 focus:ring-honey-500"
                      />
                      <span className="ml-2 text-gray-600">All Products</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="category" 
                        value="honey" 
                        checked={categoryFilter === "honey"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-honey-500 focus:ring-honey-500"
                      />
                      <span className="ml-2 text-gray-600">Honey</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="category" 
                        value="seeds" 
                        checked={categoryFilter === "seeds"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-honey-500 focus:ring-honey-500"
                      />
                      <span className="ml-2 text-gray-600">Seeds</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Checkbox className="text-honey-500 focus:ring-honey-500" />
                      <span className="ml-2 text-gray-600">Under $20</span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox className="text-honey-500 focus:ring-honey-500" />
                      <span className="ml-2 text-gray-600">$20 - $50</span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox className="text-honey-500 focus:ring-honey-500" />
                      <span className="ml-2 text-gray-600">Over $50</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">Showing {filteredProducts.length} products</div>
            <Select defaultValue="featured">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort by: Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-honey-600">${product.price}</span>
                    <Button 
                      onClick={() => addToCart(product.id)}
                      className="bg-honey-500 hover:bg-honey-600 text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          )}
          
          {/* Shopping Cart Summary */}
          <Card className="mt-12 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shopping Cart Summary
              </h3>
              {cartCount === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-2">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items in cart:</span>
                    <Badge className="bg-honey-100 text-honey-700">{cartCount}</Badge>
                  </div>
                  <Button className="w-full bg-honey-500 hover:bg-honey-600 text-white">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
