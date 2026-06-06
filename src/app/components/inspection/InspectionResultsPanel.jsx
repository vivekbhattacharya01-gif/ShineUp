import { GlassCard } from "../glass-card.jsx";
import { Badge } from "../ui/badge.jsx";

const severityStyles = {
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  High: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-100"
};

function IssueCard({ issue }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{issue.issue}</p>
          <p className="text-xs text-muted-foreground">{issue.location}</p>
        </div>
        <Badge className={severityStyles[issue.severity] || severityStyles.Medium}>
          {issue.severity}
        </Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">{issue.description}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Temporary fix
          </p>
          <p className="mt-2 text-sm leading-6">{issue.temporarySolution}</p>
        </div>
        <div className="rounded-2xl border border-border bg-muted p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Permanent solution
          </p>
          <p className="mt-2 text-sm leading-6">{issue.permanentSolution}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl border-t border-border pt-4 text-sm text-foreground/80">
        <span>{issue.recommendedService}</span>
        <span className="font-semibold">₹{issue.estimatedPrice.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

function InspectionResultsPanel({ result }) {
  if (!result) return null;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <GlassCard className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall condition</p>
              <h2 className="text-2xl font-semibold text-foreground">{result.summary}</h2>
            </div>
            <Badge className={severityStyles[result.severityLevel] || severityStyles.Medium}>
              {result.severityLevel}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-border bg-muted p-5 text-center">
              <p className="text-sm text-muted-foreground">Health score</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{result.healthScore}</p>
            </div>
            <div className="rounded-3xl border border-border bg-muted p-5 text-center">
              <p className="text-sm text-muted-foreground">Estimated cost</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{result.totalEstimatedPrice}</p>
            </div>
            <div className="rounded-3xl border border-border bg-muted p-5 text-center">
              <p className="text-sm text-muted-foreground">Detected issues</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{result.detectedIssues.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Recommended services</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.recommendedServices.map((service) => (
                <Badge key={service} className="bg-primary/10 text-primary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Analyzed issue types</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary">
              {result.analyzedCriteria?.map((criterion) => (
                <li key={criterion}>• {criterion}</li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="text-base font-semibold text-foreground">Temporary fixes</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
            {result.temporarySolutions.map((solution, index) => (
              <li key={`temp-${index}`}>• {solution}</li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-base font-semibold text-foreground">Permanent solutions</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
            {result.permanentSolutions.map((solution, index) => (
              <li key={`perm-${index}`}>• {solution}</li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-base font-semibold text-foreground">Estimated pricing</h3>
        <div className="mt-4 space-y-3 text-sm leading-6 text-secondary">
          {result.estimatedPricing.map((item) => (
            <div key={item.issue} className="flex items-center justify-between rounded-2xl border border-border bg-muted p-4">
              <span>{item.issue}</span>
              <span className="font-semibold text-foreground">{item.price}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-4">
        {result.detectedIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

export { InspectionResultsPanel };
