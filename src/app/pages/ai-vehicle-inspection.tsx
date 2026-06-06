import { useState } from "react";
import { useNavigate } from "react-router";
import { GlassCard } from "../components/glass-card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Upload,
  Camera,
  Check,
  X,
  Sparkles,
  Car,
  Bike,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Progress } from "../components/ui/progress";
import { cn } from "../components/ui/utils";

export function AIVehicleInspection() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [uploadedImages, setUploadedImages] = useState<{
    front?: File;
    rear?: File;
    left?: File;
    right?: File;
    interior?: File;
  }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const carImages = [
    { key: "front", label: "Front View", required: true },
    { key: "rear", label: "Rear View", required: true },
    { key: "left", label: "Left Side", required: true },
    { key: "right", label: "Right Side", required: true },
    { key: "interior", label: "Interior", required: true },
  ];

  const bikeImages = [
    { key: "front", label: "Front View", required: true },
    { key: "rear", label: "Rear View", required: true },
    { key: "left", label: "Side View", required: true },
    { key: "tank", label: "Tank & Body", required: true },
    { key: "wheels", label: "Wheels", required: true },
  ];

  const requiredImages = vehicleType === "car" ? carImages : bikeImages;

  const handleImageUpload = (key: string, file: File) => {
    setUploadedImages((prev) => ({ ...prev, [key]: file }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/ai-report/sample-123");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const isComplete =
    Object.keys(uploadedImages).length === requiredImages.length;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-6">
            AI Vehicle <span className="text-primary">Health Inspection</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Upload photos of your vehicle and get instant AI-powered diagnostics
            with health scores and recommendations
          </p>
        </div>

        {/* Vehicle Type Selection */}
        <GlassCard className="p-8 mb-8">
          <h3 className="text-xl mb-6 text-center">
            Select Your Vehicle Type
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div
              onClick={() => setVehicleType("car")}
              className={cn(
                "cursor-pointer rounded-xl p-6 border-2 transition-all",
                vehicleType === "car"
                  ? "border-primary bg-primary/10"
                  : "border-[var(--glass-border)] hover:border-primary/50"
              )}
            >
              <Car className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg text-center mb-2">Car</h4>
              <p className="text-sm text-foreground/60 text-center">
                Sedans, SUVs, Hatchbacks
              </p>
            </div>
            <div
              onClick={() => setVehicleType("bike")}
              className={cn(
                "cursor-pointer rounded-xl p-6 border-2 transition-all",
                vehicleType === "bike"
                  ? "border-primary bg-primary/10"
                  : "border-[var(--glass-border)] hover:border-primary/50"
              )}
            >
              <Bike className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg text-center mb-2">Bike</h4>
              <p className="text-sm text-foreground/60 text-center">
                Motorcycles, Scooters
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Upload Section */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Upload Vehicle Photos</h3>
            <Badge
              variant="outline"
              className={cn(
                "border-primary/30",
                isComplete && "bg-green-500/10 text-green-500 border-green-500/30"
              )}
            >
              {Object.keys(uploadedImages).length} / {requiredImages.length}{" "}
              uploaded
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {requiredImages.map((image) => (
              <div key={image.key}>
                <label
                  htmlFor={image.key}
                  className={cn(
                    "block aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-all relative overflow-hidden",
                    uploadedImages[image.key as keyof typeof uploadedImages]
                      ? "border-primary bg-primary/10"
                      : "border-[var(--glass-border)] hover:border-primary/50 bg-secondary/20"
                  )}
                >
                  {uploadedImages[image.key as keyof typeof uploadedImages] ? (
                    <div className="w-full h-full flex items-center justify-center bg-green-500/10">
                      <div className="text-center">
                        <Check className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-green-500">Uploaded</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <Upload className="h-10 w-10 text-foreground/40 mb-3" />
                      <p className="text-sm text-foreground/60 text-center">
                        Click to upload
                      </p>
                    </div>
                  )}
                </label>
                <input
                  id={image.key}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(image.key, file);
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-medium">{image.label}</p>
                  {image.required && (
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/30"
                    >
                      Required
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Photography Tips
            </h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Take photos in good lighting (daylight preferred)
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Ensure entire vehicle is visible in frame
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Keep camera steady and focus clear
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Capture any visible damage or issues
              </li>
            </ul>
          </div>
        </GlassCard>

        {/* Analyze Button */}
        {!isAnalyzing ? (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!isComplete}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze Vehicle
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <GlassCard className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl mb-2">Analyzing Your Vehicle...</h3>
              <p className="text-foreground/70">
                Our AI is examining your photos
              </p>
            </div>
            <Progress value={progress} className="mb-4" />
            <p className="text-center text-sm text-foreground/60">
              {progress}% Complete
            </p>
          </GlassCard>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Instant Results",
              description: "Get detailed analysis in under 2 minutes",
            },
            {
              title: "98% Accuracy",
              description: "AI trained on millions of vehicle images",
            },
            {
              title: "Cost Estimates",
              description: "Know repair costs before booking",
            },
          ].map((feature, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
