import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";

const providers = [
  { name: "Spark Auto Studio", service: "Ceramic Coating", rating: "4.9" },
  { name: "Prime Car Care", service: "PPF & Detailing", rating: "4.8" },
  { name: "Rapid Wash Hub", service: "Exterior Detailing", rating: "4.7" },
  { name: "Elite Garage", service: "Mechanical Service", rating: "4.9" }
];

export function Marketplace() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <Badge className="mb-2 bg-secondary/10 text-secondary border-secondary/30">
              Marketplace
            </Badge>
            <h1 className="text-4xl font-bold">Find the best auto service near you</h1>
            <p className="mt-3 max-w-2xl text-foreground/70">
              Browse verified partners, compare services, and book instant appointments with confidence.
            </p>
          </div>
          <Button size="lg">View all providers</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {providers.map((provider) => (
            <GlassCard key={provider.name} hover className="p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">{provider.name}</h2>
                  <p className="text-foreground/70">{provider.service}</p>
                </div>
                <div className="rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {provider.rating} ★
                </div>
              </div>
              <p className="text-foreground/70 mb-4">
                Fast booking, verified reviews, and guaranteed service quality from trusted partners.
              </p>
              <Button variant="outline">View profile</Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
