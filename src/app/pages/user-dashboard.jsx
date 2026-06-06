import { Link } from "react-router";
import { GlassCard } from "../components/glass-card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";

const stats = [
  { label: "Upcoming bookings", value: "3" },
  { label: "Vehicles", value: "2" },
  { label: "Saved partners", value: "14" }
];

export function UserDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">Dashboard</Badge>
          <h1 className="text-4xl font-bold">Your dashboard</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">Manage bookings, review service history, and keep your garage in top shape.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((item) => (
            <GlassCard key={item.label} className="p-6">
              <p className="text-sm text-foreground/60">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold">{item.value}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent activity</h2>
            <ul className="space-y-4 text-foreground/70">
              <li>Booked ceramic coating for Honda City</li>
              <li>Received reminder for brake inspection</li>
              <li>Reviewed service at Spark Auto Studio</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold">Quick actions</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/booking">New booking</Link>
              </Button>
            </div>
            <p className="text-foreground/70">Schedule service, add a new vehicle, or view your upcoming appointments.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
