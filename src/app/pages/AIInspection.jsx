import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, X, Check, Sparkles, Car as CarIcon, Bike } from "lucide-react";
import { GlassCard } from "../components/GlassCard.jsx";
import { Button } from "../components/Button.jsx";
const requiredPhotos = {
  car: ["Front", "Rear", "Left Side", "Right Side", "Interior"],
  bike: ["Front", "Rear", "Side View", "Tank & Engine", "Wheels"]
};
function AIInspection() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("car");
  const [uploads, setUploads] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const handleFileUpload = (position, file) => {
    setUploads((prev) => ({ ...prev, [position]: file }));
  };
  const removeUpload = (position) => {
    setUploads((prev) => {
      const newUploads = { ...prev };
      delete newUploads[position];
      return newUploads;
    });
  };
  const handleAnalyze = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/ai-report/1");
    }, 3e3);
  };
  const positions = requiredPhotos[vehicleType];
  const uploadedCount = Object.keys(uploads).length;
  const isComplete = uploadedCount === positions.length;
  return <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {
    /* Header */
  }
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#D4AF37]">AI-Powered Analysis</span>
          </div>

          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Vehicle <span className="text-[#D4AF37]">AI Inspection</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Upload photos of your vehicle and get instant AI-powered diagnostics with severity
            scores and cost estimates
          </p>
        </div>

        {
    /* Vehicle Type Selection */
  }
        <div className="flex justify-center gap-4 mb-12">
          <button
    onClick={() => setVehicleType("car")}
    className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all ${vehicleType === "car" ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
  >
            <CarIcon className="w-6 h-6" />
            <span className="text-lg">Car</span>
          </button>
          <button
    onClick={() => setVehicleType("bike")}
    className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all ${vehicleType === "bike" ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
  >
            <Bike className="w-6 h-6" />
            <span className="text-lg">Bike</span>
          </button>
        </div>

        {
    /* Progress */
  }
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg mb-1">Upload Progress</div>
              <div className="text-sm text-white/60">
                {uploadedCount} of {positions.length} photos uploaded
              </div>
            </div>
            <div className="text-3xl text-[#D4AF37]" style={{ fontFamily: "var(--font-heading)" }}>
              {Math.round(uploadedCount / positions.length * 100)}%
            </div>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all duration-500"
    style={{ width: `${uploadedCount / positions.length * 100}%` }}
  />
          </div>
        </GlassCard>

        {
    /* Upload Grid */
  }
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {positions.map((position) => <PhotoUploadCard
    key={position}
    position={position}
    file={uploads[position]}
    onUpload={(file) => handleFileUpload(position, file)}
    onRemove={() => removeUpload(position)}
  />)}
        </div>

        {
    /* Guidelines */
  }
        <GlassCard className="p-8 mb-8">
          <h3 className="text-2xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Photo Guidelines
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
    {
      icon: "\u{1F4F8}",
      title: "Good Lighting",
      description: "Take photos in daylight or well-lit areas"
    },
    {
      icon: "\u{1F4CF}",
      title: "Full Coverage",
      description: "Capture the entire vehicle/section in frame"
    },
    {
      icon: "\u{1F3AF}",
      title: "Clear Focus",
      description: "Ensure images are sharp and not blurry"
    },
    {
      icon: "\u{1F50D}",
      title: "Show Details",
      description: "Capture any visible damage or issues clearly"
    }
  ].map((guideline) => <div key={guideline.title} className="text-center">
                <div className="text-4xl mb-2">{guideline.icon}</div>
                <div className="mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {guideline.title}
                </div>
                <div className="text-sm text-white/60">{guideline.description}</div>
              </div>)}
          </div>
        </GlassCard>

        {
    /* Analyze Button */
  }
        <div className="text-center">
          <Button
    size="lg"
    disabled={!isComplete || isProcessing}
    onClick={handleAnalyze}
    className="min-w-64"
  >
            {isProcessing ? <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Analyzing...
              </> : <>
                <Sparkles className="w-5 h-5" />
                Analyze Vehicle
              </>}
          </Button>
          {!isComplete && <p className="text-sm text-white/60 mt-4">
              Please upload all {positions.length} photos to continue
            </p>}
        </div>
      </div>
    </div>;
}
function PhotoUploadCard({
  position,
  file,
  onUpload,
  onRemove
}) {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };
  return <GlassCard className="relative overflow-hidden group">
      {file ? <div className="relative">
          <img
    src={URL.createObjectURL(file)}
    alt={position}
    className="w-full h-64 object-cover"
  />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
    onClick={onRemove}
    className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
  >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-3 right-3 p-2 bg-green-500 rounded-full">
            <Check className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              {position}
            </div>
          </div>
        </div> : <label className="block cursor-pointer">
          <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />
          <div className="h-64 flex flex-col items-center justify-center p-6 text-center hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div className="text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {position}
            </div>
            <div className="text-sm text-white/60 mb-4">Click to upload or drag & drop</div>
            <div className="text-xs text-white/40">PNG, JPG up to 10MB</div>
          </div>
        </label>}
    </GlassCard>;
}
export {
  AIInspection
};
