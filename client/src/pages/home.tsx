import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Video, Brain, ChartLine, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import React from "react";

import type { BeeStatistics } from "@shared/schema";

export default function Home() {
  const { data: latestStats } = useQuery<BeeStatistics>({
    queryKey: ["/api/bee-statistics/latest"],
  });

  const { data: allStats } = useQuery<BeeStatistics[]>({
    queryKey: ["/api/bee-statistics"],
  });

  // Prepare chart data from last 8 hours
  const chartData = allStats?.slice(-8).map(stat => ({
    time: new Date(stat.timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    }),
    bees: stat.beeCount
  })) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-honey-100 to-honey-200 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/bee-closeup.png')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                What Bees Do <br />
                <span className="text-honey-600">All Day</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Take a peek inside the life of a honeybee colony.<br />
                Watch the live hive stream, track daily activity, and explore how bees shape our world — all from the comfort of your screen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/livestream">
                  <Button size="lg" className="bg-honey-500 hover:bg-honey-600 text-white">
                    <Video className="w-5 h-5 mr-2" />
                    Watch Live Stream
                  </Button>
                </Link>
                <Link href="/bee-counter">
                  <Button variant="outline" size="lg" className="border-2 border-honey-500 text-honey-600 hover:bg-honey-50">
                    <Brain className="w-5 h-5 mr-2" />
                    Learn How BeeBot Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/bee-closeup.png" 
                alt="Bees working on honeycomb" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-600">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Meet BeeBot the Bee Counter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This started as a camera pointed at a hive. But I couldn't stop there.
                I trained a computer vision model to recognise bees, track their movement, and count them in real time.
               It's now a fully working bee counter that tracks how many bees leave and return throughout the day.<br />
                <strong>Surprisingly effective and endlessly fascinating.</strong>
            </p>

          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="text-honey-600 text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">Live Streaming</h3>
                <p className="text-gray-600">24/7 live video feed of bee activity directly from the hive</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="text-honey-600 text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">BeeBot</h3>
                <p className="text-gray-600">A YOLOv8 model trained to detect and track each bee.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartLine className="text-honey-600 text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">Statistics</h3>
                <p className="text-gray-600">Charts and stats show when the bees are most active.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="text-honey-600 text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">Just Because</h3>
                <p className="text-gray-600">No pitch. No paywall. Just what bees do. <Link href="/shop" className="text-honey-600 underline">support us</Link>.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Bee Activity Section */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Real-Time Bee Activity
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every time a bee enters or leaves the hive it's counted,
                giving a live pulse of the colony.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-4 shadow-sm">
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-honey-600">
                      {latestStats?.beeCount ?? "—"}
                    </div>
                    <div className="text-sm text-gray-600">Bees Now</div>
                  </CardContent>
                </Card>

                <Card className="p-4 shadow-sm">
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-honey-600">
                      {allStats?.length ?? "—"}
                    </div>
                    <div className="text-sm text-gray-600">Records Today</div>
                  </CardContent>
                </Card>
              </div>

              <Link href="/statistics">
                <Button className="mt-6 bg-honey-500 hover:bg-honey-600 text-white">
                  View Full Statistics
                </Button>
              </Link>
            </div>

            <Card className="p-6 shadow-lg">
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="bees"
                        stroke="#D97706"
                        strokeWidth={2}
                        dot={false}
                        name="Bee Count"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}