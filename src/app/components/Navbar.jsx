import { Link, useLocation } from "react-router";
import {
  Sparkles,
  Store,
  Car,
  LayoutDashboard,
  Users,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { path: "/marketplace", label: "Marketplace", icon: Store },
    { path: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
    { path: "/ai-inspection", label: "AI Inspection", icon: Sparkles },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/community", label: "Community", icon: Users }
  ];
  const isActive = (path) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {
    /* Logo */
  }
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
              <Car className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Shine<span className="text-[#D4AF37]">Up</span>
            </span>
          </Link>

          {
    /* Desktop Navigation */
  }
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
    const Icon = link.icon;
    return <Link
      key={link.path}
      to={link.path}
      className={`flex items-center gap-2 transition-colors ${isActive(link.path) ? "text-[#D4AF37]" : "text-white/70 hover:text-white"}`}
    >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>;
  })}
          </div>

          {
    /* CTA Buttons */
  }
          <div className="hidden md:flex items-center gap-4">
            <Link
    to="/become-partner"
    className="px-6 py-2.5 rounded-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
  >
              Become a Partner
            </Link>
            <Link
    to="/garage"
    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-90 transition-all"
  >
              My Garage
            </Link>
          </div>

          {
    /* Mobile Menu Button */
  }
          <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="md:hidden text-white p-2"
  >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {
    /* Mobile Menu */
  }
      <AnimatePresence>
        {mobileMenuOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
  >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => {
    const Icon = link.icon;
    return <Link
      key={link.path}
      to={link.path}
      onClick={() => setMobileMenuOpen(false)}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive(link.path) ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-white/70 hover:bg-white/5"}`}
    >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>;
  })}
              <div className="pt-4 space-y-3">
                <Link
    to="/become-partner"
    onClick={() => setMobileMenuOpen(false)}
    className="block w-full px-6 py-3 rounded-lg border border-[#D4AF37] text-[#D4AF37] text-center hover:bg-[#D4AF37]/10 transition-all"
  >
                  Become a Partner
                </Link>
                <Link
    to="/garage"
    onClick={() => setMobileMenuOpen(false)}
    className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black text-center hover:opacity-90 transition-all"
  >
                  My Garage
                </Link>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}
export {
  Navbar
};
