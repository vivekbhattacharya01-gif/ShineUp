import { Link } from "react-router";
import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";

const metrics = [
  { label: "New leads", value: "128" },
  { label: "Active bookings", value: "34" },
  { label: "Response rate", value: "98%" }
];

export function PartnerDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Partner Dashboard</h1>
            <p className="mt-3 text-foreground/70">Track performance, leads, and bookings from your ShineUp partner portal.</p>
          </div>
          <Button asChild size="lg">
            <Link to="/become-partner">Update profile</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {metrics.map((metric) => (
            <GlassCard key={metric.label} className="p-6">
              <p className="text-sm text-foreground/60">{metric.label}</p>
              <p className="mt-4 text-3xl font-semibold">{metric.value}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent performance</h2>
          <p className="text-foreground/70">Your profile is visible to 2,400+ customers this week. Respond quickly to win more bookings.</p>
        </GlassCard>
      </div>
    </div>
  );
}
