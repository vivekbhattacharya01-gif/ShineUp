import { Activity, Camera, DollarSign, ShieldCheck, Sparkles, Tools, Upload, Wrench } from "lucide-react";
import { GlassCard } from "../glass-card.jsx";
import { cn } from "../ui/utils.js";

const STEPS = [
  { id: "upload", label: "Upload Vehicle Image", icon: Upload },
  { id: "analyze", label: "Analyze Vehicle Condition", icon: Activity },
  { id: "score", label: "Generate Health Score", icon: ShieldCheck },
  { id: "issues", label: "Display Issues Found", icon: Sparkles },
  { id: "temporary", label: "Show Temporary Fixes", icon: Tools },
  { id: "permanent", label: "Show Permanent Solutions", icon: Wrench },
  { id: "services", label: "Recommend Services", icon: Camera },
  { id: "pricing", label: "Display Estimated Pricing", icon: DollarSign }
];

function InspectionWorkflowSteps({ currentStep = 0 }) {
  return (
    <GlassCard className="p-6 mb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Inspection workflow</h3>
          <p className="text-sm text-foreground/70">Follow the AI inspection journey from photo upload through repair recommendations.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isDone = currentStep >= stepNumber;
          const isActive = currentStep === stepNumber;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-3xl border p-4 bg-background transition",
                isDone && "border-primary/30 bg-primary/10",
                isActive && "border-primary bg-primary/5",
                !isDone && !isActive && "border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold",
                    isDone ? "bg-primary text-primary-foreground" : "bg-slate-950/5 text-foreground"
                  )}
                >
                  {stepNumber}
                </span>
                <Icon className="h-5 w-5 text-foreground/70" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">{step.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {isDone ? "Completed" : isActive ? "In progress" : "Pending"}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export { InspectionWorkflowSteps };
