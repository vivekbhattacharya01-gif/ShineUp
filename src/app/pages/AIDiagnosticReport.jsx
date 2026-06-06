import { Link } from "react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Share2,
  Bookmark,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  Info
} from "lucide-react";
import { GlassCard } from "../components/GlassCard.jsx";
import { Button } from "../components/Button.jsx";
const carImage = "https://images.unsplash.com/photo-1628519592419-bf288f08cef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBibGFja3xlbnwxfHx8fDE3ODAwMzkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
function AIDiagnosticReport() {
  const report = {
    vehicleHealth: 87,
    severityScore: "Medium",
    analysisDate: "May 29, 2026",
    vehicleInfo: {
      type: "Car",
      make: "BMW",
      model: "3 Series",
      year: 2022
    },
    issues: [
      {
        severity: "high",
        category: "Paint Damage",
        description: "Multiple scratches detected on rear bumper",
        location: "Rear Bumper",
        estimatedCost: "\u20B98,000 - \u20B915,000",
        recommendation: "Paint correction and touch-up required"
      },
      {
        severity: "medium",
        category: "Surface Marks",
        description: "Swirl marks visible on hood and roof",
        location: "Hood, Roof",
        estimatedCost: "\u20B912,000 - \u20B920,000",
        recommendation: "Paint correction recommended"
      },
      {
        severity: "low",
        category: "Interior Wear",
        description: "Minor wear on driver seat leather",
        location: "Driver Seat",
        estimatedCost: "\u20B95,000 - \u20B98,000",
        recommendation: "Leather conditioning and touch-up"
      }
    ],
    recommendedServices: [
      "Paint Correction",
      "Ceramic Coating",
      "Interior Detailing"
    ],
    totalEstimate: {
      min: 25e3,
      max: 43e3
    }
  };
  const nearbyProviders = [
    {
      id: 1,
      name: "Elite Auto Detailing",
      location: "2.3 km away",
      rating: 4.9,
      specializes: ["Paint Correction", "Ceramic Coating"]
    },
    {
      id: 2,
      name: "Premium Care Studio",
      location: "4.1 km away",
      rating: 4.8,
      specializes: ["Paint Correction", "Interior Detailing"]
    },
    {
      id: 3,
      name: "Shine Masters",
      location: "5.8 km away",
      rating: 5,
      specializes: ["Paint Correction", "Ceramic Coating"]
    }
  ];
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-white";
    }
  };
  const getSeverityBg = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-400/10 border-red-400/20";
      case "medium":
        return "bg-yellow-400/10 border-yellow-400/20";
      case "low":
        return "bg-green-400/10 border-green-400/20";
      default:
        return "bg-white/5 border-white/10";
    }
  };
  const healthColor = report.vehicleHealth >= 80 ? "#10b981" : report.vehicleHealth >= 60 ? "#f59e0b" : "#ef4444";
  return <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {
    /* Header */
  }
        <div className="flex flex-col lg:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">AI Analysis Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Diagnostic <span className="text-[#D4AF37]">Report</span>
            </h1>
            <p className="text-xl text-white/60">
              {report.vehicleInfo.year} {report.vehicleInfo.make} {report.vehicleInfo.model}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-5 h-5" />
              Download
            </Button>
            <Button variant="outline">
              <Share2 className="w-5 h-5" />
              Share
            </Button>
            <Button variant="outline">
              <Bookmark className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>

        {
    /* Health Score & Summary */
  }
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <GlassCard className="p-8 text-center">
            <div className="text-sm text-white/60 mb-4">Vehicle Health Score</div>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
    cx="80"
    cy="80"
    r="70"
    stroke="rgba(255,255,255,0.1)"
    strokeWidth="12"
    fill="none"
  />
                <circle
    cx="80"
    cy="80"
    r="70"
    stroke={healthColor}
    strokeWidth="12"
    fill="none"
    strokeDasharray={`${2 * Math.PI * 70}`}
    strokeDashoffset={`${2 * Math.PI * 70 * (1 - report.vehicleHealth / 100)}`}
    strokeLinecap="round"
  />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl" style={{ fontFamily: "var(--font-heading)", color: healthColor }}>
                  {report.vehicleHealth}%
                </div>
              </div>
            </div>
            <div className="text-lg text-white/80">Good Condition</div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="text-sm text-white/60 mb-4">Issues Detected</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span>High Severity</span>
                </div>
                <span className="text-2xl text-red-400">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span>Medium Severity</span>
                </div>
                <span className="text-2xl text-yellow-400">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span>Low Severity</span>
                </div>
                <span className="text-2xl text-green-400">1</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="text-sm text-white/60 mb-4">Estimated Cost</div>
            <div className="flex items-baseline gap-2 mb-2">
              <IndianRupee className="w-6 h-6 text-[#D4AF37]" />
              <div className="text-4xl text-[#D4AF37]" style={{ fontFamily: "var(--font-heading)" }}>
                {report.totalEstimate.min.toLocaleString()}
              </div>
            </div>
            <div className="text-white/60 mb-6">
              to ₹{report.totalEstimate.max.toLocaleString()}
            </div>
            <div className="text-sm text-white/60">
              Based on {report.issues.length} detected issues
            </div>
          </GlassCard>
        </div>

        {
    /* Detected Issues */
  }
        <div className="mb-8">
          <h2 className="text-3xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Detected <span className="text-[#D4AF37]">Issues</span>
          </h2>

          <div className="space-y-4">
            {report.issues.map((issue, index) => <GlassCard key={index} className={`p-6 border ${getSeverityBg(issue.severity)}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${getSeverityBg(issue.severity)} flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`w-6 h-6 ${getSeverityColor(issue.severity)}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                            {issue.category}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs uppercase ${getSeverityBg(issue.severity)} ${getSeverityColor(issue.severity)}`}>
                            {issue.severity} Severity
                          </span>
                        </div>
                        <p className="text-white/70 mb-2">{issue.description}</p>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <MapPin className="w-4 h-4" />
                          {issue.location}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-white/60 mb-1">Estimated Cost</div>
                        <div className="text-xl text-[#D4AF37]" style={{ fontFamily: "var(--font-heading)" }}>
                          {issue.estimatedCost}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-4 bg-white/5 rounded-lg">
                      <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60 mb-1">Recommendation</div>
                        <div className="text-white/90">{issue.recommendation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>)}
          </div>
        </div>

        {
    /* Recommended Services */
  }
        <div className="mb-8">
          <h2 className="text-3xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Recommended <span className="text-[#D4AF37]">Services</span>
          </h2>

          <GlassCard className="p-8">
            <div className="grid md:grid-cols-3 gap-4">
              {report.recommendedServices.map((service) => <div
    key={service}
    className="p-4 bg-white/5 rounded-lg flex items-center gap-3"
  >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>{service}</span>
                </div>)}
            </div>
          </GlassCard>
        </div>

        {
    /* Nearby Providers */
  }
        <div className="mb-8">
          <h2 className="text-3xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Nearby <span className="text-[#D4AF37]">Providers</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {nearbyProviders.map((provider) => <Link key={provider.id} to={`/provider/${provider.id}`}>
                <GlassCard className="p-6" hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#D4AF37]/20 rounded-lg">
                      <span className="text-sm">{provider.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-white/60 mb-2">Specializes in:</div>
                    <div className="flex flex-wrap gap-2">
                      {provider.specializes.map((spec) => <span
    key={spec}
    className="px-2 py-1 bg-white/5 rounded-full text-xs text-[#D4AF37]"
  >
                          {spec}
                        </span>)}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </GlassCard>
              </Link>)}
          </div>
        </div>

        {
    /* Actions */
  }
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/booking">
            <Button size="lg" className="w-full sm:w-auto">
              <Calendar className="w-5 h-5" />
              Book Service Now
            </Button>
          </Link>
          <Link to="/garage">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Add to Vehicle History
            </Button>
          </Link>
        </div>
      </div>
    </div>;
}
export {
  AIDiagnosticReport
};
