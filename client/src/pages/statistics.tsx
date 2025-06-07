import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { BeeStatistics, BeeActivities } from "@shared/schema";

export default function Statistics() {
  const { data: allStats } = useQuery<BeeStatistics[]>({
    queryKey: ["/api/bee-statistics"],
  });

  const { data: latestStats } = useQuery<BeeStatistics>({
    queryKey: ["/api/bee-statistics/latest"],
  });

  const { data: activities } = useQuery<BeeActivities[]>({
    queryKey: ["/api/bee-activities"],
  });

  // Prepare daily chart data (last 24 hours)
  const dailyData = allStats?.slice(-24).map(stat => ({
    time: new Date(stat.timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    }),
    bees: stat.beeCount
  })) || [];

  // Prepare weekly data (group by day)
  const weeklyData = allStats ? (() => {
    const dayGroups: { [key: string]: number[] } = {};
    allStats.forEach(stat => {
      const day = new Date(stat.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
      if (!dayGroups[day]) dayGroups[day] = [];
      dayGroups[day].push(stat.beeCount);
    });
    
    return Object.entries(dayGroups).map(([day, counts]) => ({
      day,
      total: counts.reduce((sum, count) => sum + count, 0)
    }));
  })() : [];

  const todayTotal = allStats?.slice(-24).reduce((sum, stat) => sum + stat.beeCount, 0) || 0;
  const yesterdayTotal = allStats?.slice(-48, -24).reduce((sum, stat) => sum + stat.beeCount, 0) || 0;
  const dailyChange = yesterdayTotal > 0 ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100 : 0;

  const currentCount = latestStats?.beeCount || 0;
  const avgPerMinute = Math.round(currentCount / 60);
  const activityLevel = latestStats?.activityLevel || "low";
  const temperature = latestStats?.temperature ? Math.round(latestStats.temperature) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">Bee Activity Statistics</h1>
        <p className="text-xl text-gray-600">Comprehensive data analysis and insights</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="shadow-sm text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-honey-600 mb-2">{todayTotal.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Total Bees Today</div>
            <div className={`text-sm mt-1 flex items-center justify-center ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dailyChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(dailyChange).toFixed(1)}% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-honey-600 mb-2">{currentCount}</div>
            <div className="text-gray-600 font-medium">Current Count</div>
            <div className="text-sm text-gray-500 mt-1">Per minute average</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-honey-600 mb-2">
              {activityLevel === "high" ? "89%" : activityLevel === "medium" ? "65%" : "32%"}
            </div>
            <div className="text-gray-600 font-medium">Activity Level</div>
            <div className={`text-sm mt-1 ${activityLevel === "high" ? "text-green-600" : "text-gray-500"}`}>
              {activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1)} activity period
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-honey-600 mb-2">{temperature}°C</div>
            <div className="text-gray-600 font-medium">Temperature</div>
            <div className="text-sm text-blue-600 mt-1">Optimal range</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Daily Activity Pattern</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="bees" 
                    stroke="var(--honey-500)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--honey-500)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Weekly Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="var(--honey-500)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm mb-8">
        <CardContent className="p-6">
          <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Real-Time Activity Feed</h3>
          <div className="space-y-3">
            {activities?.map((activity, index) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.activityType === "peak_activity" ? "bg-green-500" :
                    activity.activityType === "foraging" ? "bg-blue-500" :
                    activity.activityType === "communication" ? "bg-yellow-500" :
                    "bg-purple-500"
                  }`} />
                  <span className="font-medium">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-gray-600">{activity.description}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {index === 0 ? "Just now" : `${index * 3} min ago`}
                </span>
              </div>
            )) || (
              <div className="text-center text-gray-500 py-8">
                No recent activity data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">This Week's Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Bee Entries</span>
                <span className="font-semibold text-honey-600">
                  {weeklyData.reduce((sum, day) => sum + day.total, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Daily Count</span>
                <span className="font-semibold text-honey-600">
                  {Math.round(weeklyData.reduce((sum, day) => sum + day.total, 0) / weeklyData.length || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Peak Activity Day</span>
                <span className="font-semibold text-honey-600">
                  {weeklyData.sort((a, b) => b.total - a.total)[0]?.day || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Most Active Hour</span>
                <span className="font-semibold text-honey-600">2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Environmental Factors</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Weather Impact</span>
                <Badge className="bg-green-100 text-green-700">Positive</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Temperature Range</span>
                <span className="font-semibold text-gray-700">
                  {latestStats?.temperature ? `${Math.round(latestStats.temperature - 5)}-${Math.round(latestStats.temperature + 5)}°C` : "18-26°C"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wind Speed</span>
                <span className="font-semibold text-gray-700">
                  {latestStats?.windSpeed ? `${Math.round(latestStats.windSpeed)} km/h` : "5-12 km/h"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Humidity</span>
                <span className="font-semibold text-gray-700">
                  {latestStats?.humidity ? `${Math.round(latestStats.humidity)}%` : "45-65%"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
