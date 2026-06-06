import { Badge } from "../app/components/ui/badge.jsx";
import { Button } from "../app/components/ui/button.jsx";
import { GlassCard } from "../app/components/glass-card.jsx";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Wrench, Wand2 } from "lucide-react";
import { cn } from "../app/components/ui/utils.js";

const severityClasses = {
  Low: "bg-emerald-100 text-emerald-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-destructive/10 text-destructive"
};

const statusLabels = {
  uploading: "Uploading Image",
  analyzing: "Analyzing Vehicle",
  generating: "Generating Recommendations"
};

const getWorstSeverity = (issues) => {
  if (!Array.isArray(issues) || issues.length === 0) return "Unknown";
  if (issues.some((issue) => issue.severity === "High")) return "High";
  if (issues.some((issue) => issue.severity === "Medium")) return "Medium";
  return "Low";
};

function AIHealthReport({ report, status, error, onBookService, onReset }) {
  if (status && status !== "success") {
    return (
      <GlassCard className="p-8 mb-8 text-center">
        <div className="text-xl font-semibold mb-3">{statusLabels[status] || "Preparing analysis"}</div>
        <p className="text-sm text-foreground/70 max-w-2xl mx-auto">
          {status === "uploading" && "Saving the vehicle image before sending it to Gemini."}
          {status === "analyzing" && "Gemini is reviewing the image for condition issues."}
          {status === "generating" && "Preparing the final health report and recommendations."}
        </p>
      </GlassCard>
    );
  }

  if (error) {
    return (
      <GlassCard className="p-8 mb-8 border border-destructive/20 bg-destructive/5">
        <div className="text-xl font-semibold text-destructive mb-3">{error}</div>
        <p className="text-sm text-foreground/70 mb-6">
          Please try a different vehicle image or verify your Gemini API configuration.
        </p>
        <Button onClick={onReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Try Again
        </Button>
      </GlassCard>
    );
  }

  if (!report) {
    return null;
  }

  const worstSeverity = getWorstSeverity(report.issues);

  return (
    <div className="space-y-6">
      <GlassCard className="grid gap-4 lg:grid-cols-3 p-6">
        <div className="rounded-3xl border border-border bg-muted p-6 text-center">
          <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-full bg-primary/10 text-primary mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="text-sm text-muted-foreground">Health Score</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">{report.healthScore}</p>
        </div>
        <div className="rounded-3xl border border-border bg-muted p-6 text-center">
          <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-full bg-primary/10 text-primary mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="text-sm text-muted-foreground">Overall Condition</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">{report.overallCondition}</p>
        </div>
        <div className="rounded-3xl border border-border bg-muted p-6 text-center">
          <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-full bg-primary/10 text-primary mx-auto">
            <ArrowRight className="h-6 w-6" />
          </div>
          <p className="text-sm text-muted-foreground">Estimated Price</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">{report.estimatedPriceRange}</p>
        </div>
      </GlassCard>

      <GlassCard className="grid gap-4 lg:grid-cols-2 p-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommended Services</h3>
          <div className="flex flex-wrap gap-2">
            {report.recommendedServices.map((service) => (
              <Badge key={service} className="bg-primary/10 text-primary">
                {service}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Severity</h3>
          <Badge className={cn("px-4 py-2 text-sm font-semibold", severityClasses[worstSeverity] || "bg-slate-100 text-foreground")}>{worstSeverity}</Badge>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <Wrench className="h-4 w-4 text-primary" />
            Temporary Fixes
          </div>
          <ul className="space-y-3 text-sm text-foreground/80">
            {report.temporarySolutions.map((solution, index) => (
              <li key={`temp-${index}`}>• {solution}</li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <Wand2 className="h-4 w-4 text-primary" />
            Permanent Solutions
          </div>
          <ul className="space-y-3 text-sm text-foreground/80">
            {report.permanentSolutions.map((solution, index) => (
              <li key={`perm-${index}`}>• {solution}</li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Issue Confidence
          </div>
          <ul className="space-y-3 text-sm text-foreground/80">
            {report.issues.map((issue, index) => (
              <li key={`conf-${index}`}>
                <span className="font-medium text-foreground">{issue.issue}</span> — {issue.confidence}% confidence
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detected Issues</h3>
        <div className="grid gap-4">
          {report.issues.map((issue) => (
            <div key={issue.issue} className="rounded-3xl border border-border bg-background p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{issue.issue}</p>
                  <p className="text-xs text-muted-foreground">Severity: {issue.severity}</p>
                </div>
                <Badge className={severityClasses[issue.severity] || "bg-slate-100 text-foreground"}>
                  {issue.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onBookService} className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
          Book Recommended Service
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1 border-border">
          Start New Analysis
        </Button>
      </div>
    </div>
  );
}

export { AIHealthReport };
