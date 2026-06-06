import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Link } from "react-router";
import { Sparkles, Shield, Users } from "lucide-react";

export function LandingPage() {
  const features = [
    { icon: Sparkles, title: "Premium care", description: "Top-rated service providers with verified quality." },
    { icon: Shield, title: "Secure bookings", description: "Safe payments and trusted support for every order." },
    { icon: Users, title: "Community trust", description: "Thousands of happy customers across India." }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_38%),linear-gradient(180deg,#050504_0%,#090908_100%)]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="pt-6">
            <Badge className="mb-4 inline-flex rounded-full bg-primary/10 text-primary border-primary/30 px-4 py-2 text-sm">
              Trusted by Drivers
            </Badge>
            <h1 className="mt-4 text-5xl font-bold tracking-tight leading-tight text-white sm:text-6xl">
              ShineUp makes vehicle care effortless.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/70">
              Discover service partners, book maintenance, track your garage, and get AI-powered advice — all from one intelligent platform built for modern vehicle owners.
            </p>

            <div className="mt-10 grid gap-3 sm:flex sm:items-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4">
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4">
                <Link to="/become-partner">Become a Partner</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto border border-white/10 px-8 py-4 text-white/80 hover:text-white">
                <Link to="/ai-assistant">Ask AI Assistant</Link>
              </Button>
            </div>

            <div className="mt-8 text-sm text-foreground/60 sm:max-w-xl">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 font-medium text-white/80">
                <span className="mr-2 text-[#D4AF37]">●</span>
                Trusted booking, transparent pricing, and verified partner reviews in one place.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((item) => (
              <GlassCard key={item.title} hover className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
                <p className="text-foreground/70 leading-7">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <section className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Fast booking", text: "Book verified service providers in just a few taps, with instant availability updates." },
            { title: "Garage management", text: "Track vehicle service history, upcoming reminders, and ownership details in one dashboard." },
            { title: "AI support", text: "Ask ShineUp for maintenance advice, inspection guidance, and service recommendations." }
          ].map((item) => (
            <GlassCard key={item.title} hover className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
              <p className="text-foreground/70 leading-7">{item.text}</p>
            </GlassCard>
          ))}
        </section>
      </div>
    </div>
  );
}
