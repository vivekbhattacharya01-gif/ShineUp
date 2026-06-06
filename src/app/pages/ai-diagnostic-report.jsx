import { useLocation, useNavigate, useParams } from "react-router";
import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { AIHealthReport } from "../../components/AIHealthReport.jsx";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Save,
  Calendar,
  MapPin,
  TrendingUp,
  Info,
  ChevronRight
} from "lucide-react";
import { Progress } from "../components/ui/progress.jsx";
import { Separator } from "../components/ui/separator.jsx";
function AIDiagnosticReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const analysisReport = location.state?.report;
  const isGeminiReport = Boolean(analysisReport?.healthScore);
  const report = isGeminiReport
    ? analysisReport
    : {
        id: "sample-123",
        date: "May 29, 2026",
        vehicleType: "car",
        healthScore: 72,
        severityScore: "Medium",
        issues: [
          {
            category: "Paint & Body",
            severity: "High",
            items: [
              {
                issue: "Front Bumper Scratches",
                location: "Front Bumper - Right Side",
                severity: "Medium",
                estimatedCost: 3500,
                description: "Multiple scratches detected on front bumper requiring paint correction"
              },
              {
                issue: "Door Dent",
                location: "Rear Door - Left Side",
                severity: "High",
                estimatedCost: 8500,
                description: "Small dent detected, requires PDR or body work"
              }
            ]
          },
          {
            category: "Interior",
            severity: "Low",
            items: [
              {
                issue: "Seat Stains",
                location: "Driver Seat",
                severity: "Low",
                estimatedCost: 2500,
                description: "Minor stains detected, deep cleaning recommended"
              }
            ]
          },
          {
            category: "Wheels & Tires",
            severity: "Medium",
            items: [
              {
                issue: "Rim Scratches",
                location: "Front Left Wheel",
                severity: "Low",
                estimatedCost: 1800,
                description: "Surface scratches on alloy rim"
              }
            ]
          }
        ],
        totalEstimatedCost: 16300,
        recommendations: [
          "Paint correction and polishing for scratches",
          "Professional dent removal (PDR)",
          "Deep interior cleaning and leather treatment",
          "Alloy wheel refurbishment"
        ],
        nearbyProviders: [
          {
            id: "1",
            name: "Premium Auto Detailing Studio",
            distance: "2.3 km",
            rating: 4.9,
            specialization: "Paint Correction & PDR"
          },
          {
            id: "2",
            name: "Royal Shine Car Care",
            distance: "4.1 km",
            rating: 4.8,
            specialization: "Interior Detailing"
          },
          {
            id: "3",
            name: "Elite Auto Works",
            distance: "5.8 km",
            rating: 4.7,
            specialization: "Body Work & Painting"
          }
        ]
      };
  const reportTitle = isGeminiReport ? "Gemini Vehicle Health Report" : "AI Diagnostic Report";
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      default:
        return "text-foreground/70";
    }
  };
  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          /* Header */
        }
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl mb-2">
              {reportTitle} <span className="text-primary">Report</span>
            </h1>
            <p className="text-foreground/70">
              {isGeminiReport
                ? "Gemini Vision analysis based on your uploaded vehicle image."
                : `Report ID: ${report.id} • Generated on ${report.date}`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/30">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="border-primary/30">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {isGeminiReport ? (
          <AIHealthReport
            report={report}
            onBookService={() => navigate("/booking")}
            onReset={() => navigate("/ai-inspection")}
          />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {
              /* Main Content */
            }
            <div className="lg:col-span-2 space-y-6">
              {
                /* Health Score */
              }
              <GlassCard className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-secondary"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - report.healthScore / 100)}`}
                          className={getHealthScoreColor(report.healthScore)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <div className={`text-4xl font-bold ${getHealthScoreColor(report.healthScore)}`}>
                            {report.healthScore}
                          </div>
                          <div className="text-xs text-foreground/60">/ 100</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">Health Score</h3>
                    <p className="text-sm text-foreground/60">Overall vehicle condition</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-yellow-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-10 w-10 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold mb-1">
                      {report.issues.reduce((acc, cat) => acc + cat.items.length, 0)} Issues
                    </h3>
                    <p className="text-sm text-foreground/60">{report.severityScore} Severity</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">₹{report.totalEstimatedCost.toLocaleString()}</h3>
                    <p className="text-sm text-foreground/60">Estimated Cost</p>
                  </div>
                </div>
              </GlassCard>

              {
                /* Detected Issues */
              }
              <GlassCard className="p-8">
                <h2 className="text-2xl mb-6">Detected Issues</h2>
                <div className="space-y-6">
                  {report.issues.map((category, catIndex) => (
                    <div key={catIndex}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg">{category.category}</h3>
                        <Badge variant="outline" className={getSeverityColor(category.severity)}>
                          {category.severity} Priority
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-secondary/20 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{item.issue}</h4>
                                <p className="text-sm text-foreground/60 flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </p>
                              </div>
                              <Badge variant="outline" className={getSeverityColor(item.severity)}>
                                {item.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground/70 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground/60">Estimated Cost</span>
                              <span className="font-semibold text-primary">₹{item.estimatedCost.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {catIndex < report.issues.length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {
                /* Recommendations */
              }
              <GlassCard className="p-8">
                <h2 className="text-2xl mb-6">Recommended Services</h2>
                <div className="space-y-3">
                  {report.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground/80">{rec}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {
              /* Sidebar */
            }
            <div className="space-y-6">
              {
                /* Actions */
              }
              <GlassCard className="p-6">
                <h3 className="text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/booking")}> 
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Service
                  </Button>
                  <Button variant="outline" className="w-full border-primary/30" onClick={() => navigate("/garage")}> 
                    <Save className="h-4 w-4 mr-2" />
                    Add to Vehicle History
                  </Button>
                </div>
              </GlassCard>

              {
                /* Cost Breakdown */
              }
              <GlassCard className="p-6">
                <h3 className="text-lg mb-4">Cost Breakdown</h3>
                <div className="space-y-3">
                  {report.issues.map((category, index) => {
                    const categoryTotal = category.items.reduce((acc, item) => acc + item.estimatedCost, 0);
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-foreground/70">{category.category}</span>
                          <span className="font-semibold">₹{categoryTotal.toLocaleString()}</span>
                        </div>
                        <Progress value={(categoryTotal / report.totalEstimatedCost) * 100} className="h-2" />
                      </div>
                    );
                  })}
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Estimate</span>
                    <span className="text-xl font-bold text-primary">₹{report.totalEstimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </GlassCard>

              {
                /* Nearby Providers */
              }
              <GlassCard className="p-6">
                <h3 className="text-lg mb-4">Nearby Providers</h3>
                <div className="space-y-4">
                  {report.nearbyProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-secondary/20 rounded-lg p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                      onClick={() => navigate(`/provider/${provider.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{provider.name}</h4>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-primary">{provider.rating}</span>
                          <span className="text-foreground/60">★</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground/60 mb-2">{provider.specialization}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/60">📍 {provider.distance} away</span>
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {
                /* Info */
              }
              <GlassCard className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Note</h4>
                    <p className="text-xs text-foreground/70">
                      Cost estimates are approximate and may vary based on your location and chosen service provider. Final pricing will be confirmed during booking.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export {
  AIDiagnosticReport
};
