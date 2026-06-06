import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";

export function ProviderProfile() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/30">Verified Partner</Badge>
              <span className="rounded-full border px-3 py-1 text-sm text-foreground/70">4.9 rating</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Spark Auto Studio</h1>
            <p className="text-foreground/70 mb-6">
              Premium detailing, ceramic coating, and PPF services with same-day booking and doorstep pickup options.
            </p>
            <GlassCard className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Services offered</h2>
              <ul className="space-y-3 text-foreground/70">
                <li>Ceramic Coating</li>
                <li>Paint Protection Film</li>
                <li>Interior Detailing</li>
                <li>Exterior Polishing</li>
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="text-foreground/70">Sector 18, Noida, Uttar Pradesh</p>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Booking details</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary/5 p-4">
                  <p className="text-sm text-foreground/60">Starting price</p>
                  <p className="text-3xl font-semibold">₹4,499</p>
                </div>
                <div className="rounded-2xl bg-primary/5 p-4">
                  <p className="text-sm text-foreground/60">Next available slot</p>
                  <p className="text-xl font-semibold">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </GlassCard>
            <Button size="lg" className="w-full bg-primary text-primary-foreground">Book now</Button>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Customer reviews</h2>
              <p className="text-foreground/70">“Excellent service and attention to detail. My car looked brand new again.”</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
