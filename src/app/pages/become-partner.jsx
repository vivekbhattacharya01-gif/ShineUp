import { useState } from "react";
import { GlassCard } from "../components/glass-card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { Checkbox } from "../components/ui/checkbox.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Progress } from "../components/ui/progress.jsx";
import { Store, Users, TrendingUp, Shield, CheckCircle, ChevronRight, Upload } from "lucide-react";
function BecomePartner() {
  const [step, setStep] = useState(0);
  const benefits = [
    { icon: Users, title: "Access 50,000+ Users", description: "Get discovered by vehicle owners actively seeking services" },
    { icon: TrendingUp, title: "Grow Your Revenue", description: "Average partners see 40% revenue increase in first 6 months" },
    { icon: Shield, title: "Verified Badge", description: "Build trust with our verification system" },
    { icon: Store, title: "Professional Dashboard", description: "Manage bookings, portfolio, and analytics" }
  ];
  return <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 0 ? <>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                Partner Program
              </Badge>
              <h1 className="text-5xl mb-6">
                Grow Your Business with <span className="text-primary">ShineUp</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Join India's fastest-growing automotive care marketplace and connect with thousands of potential customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => <GlassCard key={index} hover className="p-8">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p className="text-foreground/70">{benefit.description}</p>
                </GlassCard>)}
            </div>

            <div className="text-center">
              <Button
    size="lg"
    onClick={() => setStep(1)}
    className="bg-primary text-primary-foreground hover:bg-primary/90 px-12"
  >
                Start Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </> : <>
            <div className="mb-8">
              <h1 className="text-4xl mb-2">Partner Application</h1>
              <p className="text-foreground/70">Fill in your business details</p>
            </div>

            <GlassCard className="p-6 mb-8">
              <Progress value={step / 4 * 100} />
              <div className="flex justify-between mt-4">
                <span className="text-sm text-foreground/60">Step {step} of 4</span>
                <span className="text-sm text-foreground/60">{step / 4 * 100}% Complete</span>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              {step === 1 && <>
                  <h2 className="text-2xl mb-6">Business Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Business Name *</Label>
                      <Input placeholder="Premium Auto Detailing" className="bg-input-background border-primary/10" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Contact Person *</Label>
                        <Input placeholder="John Doe" className="bg-input-background border-primary/10" />
                      </div>
                      <div>
                        <Label>Phone Number *</Label>
                        <Input placeholder="+91 98765 43210" className="bg-input-background border-primary/10" />
                      </div>
                    </div>
                    <div>
                      <Label>Business Address *</Label>
                      <Textarea placeholder="Complete address..." className="bg-input-background border-primary/10" />
                    </div>
                    <div>
                      <Label>Years in Business *</Label>
                      <Input placeholder="5" type="number" className="bg-input-background border-primary/10" />
                    </div>
                  </div>
                </>}

              {step === 2 && <>
                  <h2 className="text-2xl mb-6">Services & Pricing</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Services Offered *</Label>
                      <div className="space-y-2">
                        {["Ceramic Coating", "PPF", "Paint Correction", "Interior Detailing", "Exterior Detailing", "Bike Detailing"].map((service) => <div key={service} className="flex items-center gap-3">
                            <Checkbox id={service} />
                            <label htmlFor={service} className="text-sm">{service}</label>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <Label>Starting Price Range *</Label>
                      <Input placeholder="e.g., ₹3,000 - ₹85,000" className="bg-input-background border-primary/10" />
                    </div>
                  </div>
                </>}

              {step === 3 && <>
                  <h2 className="text-2xl mb-6">Portfolio & Certifications</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Portfolio Images</Label>
                      <div className="mt-2 border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
                        <p className="text-foreground/70 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-foreground/50">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    <div>
                      <Label>Certifications (if any)</Label>
                      <Textarea placeholder="List your certifications..." className="bg-input-background border-primary/10" />
                    </div>
                  </div>
                </>}

              {step === 4 && <>
                  <div className="text-center py-8">
                    <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl mb-4">Application Submitted!</h2>
                    <p className="text-foreground/70 mb-8">
                      Our team will review your application and contact you within 2-3 business days.
                    </p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Back to Home
                    </Button>
                  </div>
                </>}

              {step < 4 && <div className="flex gap-3 mt-8">
                  {step > 1 && <Button
    variant="outline"
    onClick={() => setStep(step - 1)}
    className="border-primary/30"
  >
                      Back
                    </Button>}
                  <Button
    onClick={() => setStep(step + 1)}
    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
  >
                    {step === 3 ? "Submit Application" : "Continue"}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>}
            </GlassCard>
          </>}
      </div>
    </div>;
}
export {
  BecomePartner
};
