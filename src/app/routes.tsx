import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { LandingPage } from "./pages/landing-page";
import { Marketplace } from "./pages/marketplace";
import { ProviderProfile } from "./pages/provider-profile";
import { AIVehicleInspection } from "./pages/ai-vehicle-inspection";
import { AIDiagnosticReport } from "./pages/ai-diagnostic-report";
import { UserDashboard } from "./pages/user-dashboard";
import { MyGarage } from "./pages/my-garage";
import { VehicleHistory } from "./pages/vehicle-history";
import { MaintenanceReminders } from "./pages/maintenance-reminders";
import { BookingFlow } from "./pages/booking-flow";
import { Community } from "./pages/community";
import { BecomePartner } from "./pages/become-partner";
import { PartnerDashboard } from "./pages/partner-dashboard";
import { AdminDashboard } from "./pages/admin-dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "marketplace", Component: Marketplace },
      { path: "provider/:id", Component: ProviderProfile },
      { path: "ai-inspection", Component: AIVehicleInspection },
      { path: "ai-report/:id", Component: AIDiagnosticReport },
      { path: "dashboard", Component: UserDashboard },
      { path: "garage", Component: MyGarage },
      { path: "vehicle-history/:vehicleId", Component: VehicleHistory },
      { path: "reminders", Component: MaintenanceReminders },
      { path: "booking", Component: BookingFlow },
      { path: "community", Component: Community },
      { path: "become-partner", Component: BecomePartner },
      { path: "partner-dashboard", Component: PartnerDashboard },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);
