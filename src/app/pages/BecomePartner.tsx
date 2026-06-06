import { useState } from "react";
import { CheckCircle2, Upload, Award, TrendingUp, Users, IndianRupee } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/Button";

export function BecomePartner() {
  const [currentStep, setCurrentStep] = useState(1);

  const benefits = [
    {
      icon: Users,
      title: "Access to Customers",
      description: "Connect with 25,000+ verified vehicle owners",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Increase revenue by up to 40% with our platform",
    },
    {
      icon: Award,
      title: "Build Credibility",
      description: "Showcase certifications and portfolio to attract clients",
    },
    {
      icon: IndianRupee,
      title: "Transparent Pricing",
      description: "Set your own prices, no hidden fees",
    },
  ];

  const steps = [
    { number: 1, title: "Business Details" },
    { number: 2, title: "Services & Pricing" },
    { number: 3, title: "Portfolio Upload" },
    { number: 4, title: "Verification" },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Become a <span className="text-[#D4AF37]">Partner</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Join India's fastest-growing automotive care platform and grow your detailing business
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => (
            <GlassCard key={benefit.title} className="p-6 text-center" hover>
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {benefit.title}
              </h3>
              <p className="text-sm text-white/60">{benefit.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= step.number ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/40"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="w-6 h-6" /> : step.number}
                  </div>
                  <div className={`text-sm text-center ${currentStep >= step.number ? "text-white" : "text-white/40"}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${currentStep > step.number ? "bg-[#D4AF37]" : "bg-white/10"}`}></div>
                )}
              </div>
            ))}
          </div>

          <GlassCard className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Business <span className="text-[#D4AF37]">Details</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Business Name</label>
                    <input
                      type="text"
                      placeholder="Elite Auto Detailing"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Owner Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Email</label>
                    <input
                      type="email"
                      placeholder="contact@business.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm text-white/70">Address</label>
                    <input
                      type="text"
                      placeholder="Complete business address"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">City</label>
                    <input
                      type="text"
                      placeholder="Mumbai"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Years of Experience</label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Services & <span className="text-[#D4AF37]">Pricing</span>
                </h2>
                <div className="space-y-4">
                  {["Ceramic Coating", "PPF", "Paint Correction", "Interior Detailing", "Exterior Detailing"].map((service) => (
                    <div key={service} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <input type="checkbox" className="w-5 h-5" />
                        <label className="text-lg">{service}</label>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 pl-8">
                        <input
                          type="number"
                          placeholder="Min Price (₹)"
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Max Price (₹)"
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Duration"
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Portfolio <span className="text-[#D4AF37]">Upload</span>
                </h2>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-[#D4AF37]/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Upload Your Best Work</h3>
                  <p className="text-white/60 mb-4">Drag & drop images or click to browse</p>
                  <Button>Select Images</Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="text-[#D4AF37]">Verification</span> Documents
                </h2>
                <div className="space-y-4">
                  {["Business Registration", "GST Certificate", "Identity Proof", "Address Proof"].map((doc) => (
                    <div key={doc} className="p-4 bg-white/5 rounded-lg">
                      <label className="block mb-2">{doc}</label>
                      <input
                        type="file"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="flex-1">
                  Previous
                </Button>
              )}
              <Button
                onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : null}
                className="flex-1"
              >
                {currentStep === 4 ? "Submit Application" : "Next Step"}
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
