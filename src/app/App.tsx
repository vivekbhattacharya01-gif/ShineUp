/**
 * ShineUp - Premium AI-Powered Automotive Care Platform
 * 
 * A luxury dark-mode marketplace connecting car and bike owners 
 * with verified detailing professionals across India.
 * 
 * Key Features:
 * - AI Vehicle Health Inspection with instant diagnostics
 * - Verified provider marketplace with 1200+ professionals
 * - Smart maintenance reminders and vehicle history tracking
 * - Community hub for automotive enthusiasts
 * - Partner and admin dashboards for business management
 * 
 * Tech Stack: React, React Router, Tailwind CSS, Recharts
 * Design: Glassmorphism UI with Black + Gold premium theme
 */

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}