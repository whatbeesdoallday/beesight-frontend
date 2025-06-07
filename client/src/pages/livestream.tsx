import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YoutubeEmbed from "@/components/youtube-embed";
import type { BeeStatistics } from "@shared/schema";

export default function Livestream() {
  const { data: latestStats } = useQuery<BeeStatistics>({
    queryKey: ["/api/bee-statistics/latest"],
  });

  const getActivityLevel = (level: string) => {
    switch (level) {
      case "high": return { text: "High", color: "bg-green-500" };
      case "medium": return { text: "Medium", color: "bg-yellow-500" };
      default: return { text: "Low", color: "bg-red-500" };
    }
  };

  const activity = latestStats ? getActivityLevel(latestStats.activityLevel) : { text: "Unknown", color: "bg-gray-500" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">Live Bee Stream</h1>
        <p className="text-xl text-gray-600">Watch our bees in action 24/7</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-2xl">
            <YoutubeEmbed />
          </Card>
          
          <Card className="mt-6 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">About This Stream</h3>
              <p className="text-gray-600 mb-4">
                This live feed comes directly from our observation hive, equipped with a high-definition 
                camera positioned to capture the entrance and main activity areas. The stream runs 24/7, 
                allowing you to observe natural bee behavior patterns throughout different times of day.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-honey-100 text-honey-700">HD Quality</Badge>
                <Badge className="bg-honey-100 text-honey-700">24/7 Live</Badge>
                <Badge className="bg-honey-100 text-honey-700">Audio Enabled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live Activity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Bees</span>
                  <span className="font-semibold text-honey-600">{latestStats?.beeCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activity Level</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <span className="font-semibold text-green-600">{activity.text}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperature</span>
                  <span className="font-semibold text-gray-700">
                    {latestStats?.temperature ? `${Math.round(latestStats.temperature)}°C` : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Best Viewing Times</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Morning Rush</span>
                  <span className="font-medium">7:00 - 9:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Activity</span>
                  <span className="font-medium">11:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Evening Return</span>
                  <span className="font-medium">4:00 - 6:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">What to Look For</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-honey-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                  Forager bees returning with pollen
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-honey-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                  Guard bees protecting the entrance
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-honey-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                  Communication dances
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-honey-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                  Wing fanning for temperature control
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
