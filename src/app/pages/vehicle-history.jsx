import { GlassCard } from "../components/glass-card.jsx";

const history = [
  { date: "2025-09-12", title: "Ceramic coating completed", details: "Spark Auto Studio - Honda City" },
  { date: "2025-06-03", title: "Oil change & filter replacement", details: "Rapid Wash Hub - Royal Enfield" },
  { date: "2025-03-18", title: "Brake pad inspection", details: "Elite Garage - Honda City" }
];

export function VehicleHistory() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Vehicle History</h1>
          <p className="mt-3 text-foreground/70">Review past services, repairs, and inspections for your selected vehicle.</p>
        </div>

        <div className="space-y-6">
          {history.map((entry) => (
            <GlassCard key={entry.date} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-foreground/60">{entry.date}</p>
                  <h2 className="text-2xl font-semibold">{entry.title}</h2>
                </div>
                <p className="text-foreground/70">{entry.details}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
