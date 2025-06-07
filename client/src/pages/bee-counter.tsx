import { Eye, Route, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function BeeCounter() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">AI Bee Counter</h1>
        <p className="text-xl text-gray-600">How computer vision tracks bee activity</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Computer Vision Technology</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our bee counting system uses advanced computer vision algorithms to automatically detect, 
            track, and count individual bees in real-time video streams. The model has been trained 
            on thousands of bee images to achieve high accuracy in various lighting conditions.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Eye className="text-honey-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Object Detection</h3>
                <p className="text-gray-600 text-sm">YOLOv8 model trained specifically on bee imagery</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Route className="text-honey-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Motion Tracking</h3>
                <p className="text-gray-600 text-sm">DeepSORT algorithm for tracking individual bee movements</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Calculator className="text-honey-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Activity Analysis</h3>
                <p className="text-gray-600 text-sm">Statistical analysis of entrance/exit patterns</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Computer vision AI processing workflow" 
              className="w-full rounded-lg mb-4"
            />
            <div className="text-center">
              <h3 className="font-heading font-semibold text-gray-800 mb-2">AI Processing Pipeline</h3>
              <p className="text-gray-600 text-sm">Real-time video analysis and bee detection</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg mb-12">
        <CardContent className="p-8">
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-honey-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Video Capture</h3>
              <p className="text-gray-600 text-sm">High-resolution camera captures live feed from hive entrance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-honey-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Detection</h3>
              <p className="text-gray-600 text-sm">Computer vision model identifies and locates bees in each frame</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-honey-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Motion Tracking</h3>
              <p className="text-gray-600 text-sm">Algorithm tracks individual bee movements and behavior patterns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-honey-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Data Analysis</h3>
              <p className="text-gray-600 text-sm">Statistical processing generates insights and activity metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Model Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Detection Accuracy</span>
                <div className="flex items-center">
                  <Progress value={94.2} className="w-24 mr-3" />
                  <span className="font-semibold text-honey-600">94.2%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Processing Speed</span>
                <div className="flex items-center">
                  <Progress value={100} className="w-24 mr-3" />
                  <span className="font-semibold text-green-600">30 FPS</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tracking Accuracy</span>
                <div className="flex items-center">
                  <Progress value={91.8} className="w-24 mr-3" />
                  <span className="font-semibold text-blue-600">91.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Architecture</span>
                <span className="font-medium">YOLOv8n</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Dataset</span>
                <span className="font-medium">15,000+ images</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Input Resolution</span>
                <span className="font-medium">640x640</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inference Time</span>
                <span className="font-medium">33ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hardware</span>
                <span className="font-medium">NVIDIA RTX 3060</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
