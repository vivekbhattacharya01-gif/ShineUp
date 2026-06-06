import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";

const reminders = [
  { title: "Tyre rotation", due: "In 3 days" },
  { title: "Oil filter change", due: "In 7 days" },
  { title: "Battery health check", due: "In 2 weeks" }
];

export function MaintenanceReminders() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Maintenance Reminders</h1>
            <p className="mt-3 text-foreground/70">Stay ahead of your vehicle service schedule with timely reminders.</p>
          </div>
          <Button size="lg">Add reminder</Button>
        </div>

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <GlassCard key={reminder.title} className="p-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{reminder.title}</h2>
                <p className="text-foreground/70">Due {reminder.due}</p>
              </div>
              <Button variant="outline" size="sm">Reschedule</Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
