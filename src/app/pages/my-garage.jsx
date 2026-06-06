import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";

const vehicles = [
  { name: "Honda City", year: "2021", status: "Next service in 14 days" },
  { name: "Royal Enfield Meteor", year: "2022", status: "Inspection overdue" }
];

export function MyGarage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">My Garage</h1>
          <p className="mt-3 text-foreground/70">Keep all your vehicles organized and track their next service schedule.</p>
        </div>

        <div className="space-y-6">
          {vehicles.map((vehicle) => (
            <GlassCard key={vehicle.name} className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{vehicle.name}</h2>
                <p className="text-foreground/70">{vehicle.year}</p>
              </div>
              <div className="space-y-2 text-right">
                <p className="text-foreground/70">{vehicle.status}</p>
                <Button size="sm">View details</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
