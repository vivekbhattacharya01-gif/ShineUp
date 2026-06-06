import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Link } from "react-router";
import { Sparkles, Shield, Users } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
              Trusted by Drivers
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              ShineUp makes vehicle care effortless.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/70">
              Discover service partners, book maintenance, track your garage, and keep your vehicle running like new — all from one intelligent platform.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:items-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground px-8">
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8">
                <Link to="/become-partner">Become a Partner</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto border border-white/10 px-8 text-white/80 hover:text-white">
                <Link to="/ai-assistant">Ask AI Assistant</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Sparkles, title: "Premium care", description: "Top-rated service providers with verified quality." },
              { icon: Shield, title: "Secure bookings", description: "Safe payments and trusted support for every order." },
              { icon: Users, title: "Community trust", description: "Thousands of happy customers across India." }
            ].map((item) => (
              <GlassCard key={item.title} hover className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-foreground/70">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
