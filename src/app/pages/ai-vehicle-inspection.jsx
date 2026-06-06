import { useState } from "react";
import { useNavigate } from "react-router";
import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Camera, Sparkles, Car, Bike, ChevronRight } from "lucide-react";
import { cn } from "../components/ui/utils.js";
import { useVehicleAnalysis } from "../../hooks/useVehicleAnalysis.js";
import { VehicleImageUploader } from "../../components/VehicleImageUploader.jsx";
import { AIHealthReport } from "../../components/AIHealthReport.jsx";

function AIVehicleInspection() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("car");
  const { imageFile, report, status, error, uploadImage, analyze, clearAnalysis, STATUS } = useVehicleAnalysis();

  const handleAnalyze = async () => {
    await analyze({ vehicleType });
  };

  const handleBookService = () => {
    navigate("/booking");
  };

  const handleViewFullReport = () => {
    if (!report) return;
    navigate("/ai-report/1", { state: { report } });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Gemini Vision Vehicle Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-6">
            ShineUp <span className="text-primary">AI Inspection</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Upload a vehicle image, send it to Gemini Vision, and review a health report with issue detection, fix guidance, and pricing.
          </p>
        </div>

        <GlassCard className="p-8 mb-8">
          <h3 className="text-xl mb-6 text-center">Select Your Vehicle Type</h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setVehicleType("car")}
              className={cn(
                "rounded-xl p-6 border-2 transition-all text-left",
                vehicleType === "car"
                  ? "border-primary bg-primary/10"
                  : "border-[var(--glass-border)] hover:border-primary/50"
              )}
            >
              <Car className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-lg mb-2">Car</h4>
              <p className="text-sm text-foreground/60">Sedans, SUVs, Hatchbacks</p>
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("bike")}
              className={cn(
                "rounded-xl p-6 border-2 transition-all text-left",
                vehicleType === "bike"
                  ? "border-primary bg-primary/10"
                  : "border-[var(--glass-border)] hover:border-primary/50"
              )}
            >
              <Bike className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-lg mb-2">Bike</h4>
              <p className="text-sm text-foreground/60">Motorcycles, Scooters</p>
            </button>
          </div>
        </GlassCard>

        <VehicleImageUploader
          imageFile={imageFile}
          onSelect={uploadImage}
          onRemove={clearAnalysis}
          error={error}
          isUploading={status === STATUS.UPLOADING}
        />

        <GlassCard className="p-8 mb-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Upload Vehicle Image",
                description: "Provide a clear photo of your vehicle."
              },
              {
                label: "Analyze with Gemini",
                description: "Gemini Vision checks for paint, headlights, and surface condition issues."
              },
              {
                label: "Generate Recommendations",
                description: "Receive fixes, services, and pricing guidance."
              }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border bg-muted p-5">
                <h4 className="text-base font-semibold mb-2">{item.label}</h4>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex flex-col items-center gap-4 mb-10 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!imageFile || status === STATUS.ANALYZING || status === STATUS.GENERATING}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Analyze Vehicle
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          {report ? (
            <Button variant="outline" onClick={handleViewFullReport} className="border-border">
              View Full Report
            </Button>
          ) : null}
        </div>

        <AIHealthReport
          report={report}
          status={status === STATUS.ERROR ? undefined : status}
          error={status === STATUS.ERROR ? error : ""}
          onBookService={handleBookService}
          onReset={clearAnalysis}
        />
      </div>
    </div>
  );
}

export { AIVehicleInspection };

