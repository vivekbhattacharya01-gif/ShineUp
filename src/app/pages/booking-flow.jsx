import { useState } from "react";
import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Textarea } from "../components/ui/textarea.jsx";

export function BookingFlow() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Booking Flow</h1>
          <p className="mt-3 text-foreground/70">Complete your service booking in three easy steps.</p>
        </div>

        <GlassCard className="p-6 mb-8">
          {submitted ? (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold">Booking confirmed</h2>
              <p className="text-foreground/70">Your appointment request has been submitted successfully.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <Label>Service type</Label>
                <Input placeholder="Ceramic Coating" />
              </div>
              <div>
                <Label>Preferred date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Additional notes</Label>
                <Textarea placeholder="Enter any special instructions" />
              </div>
              <Button size="lg" onClick={() => setSubmitted(true)}>
                Confirm booking
              </Button>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
