import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout.jsx";
import { LandingPage } from "./pages/landing-page.jsx";
import { Marketplace } from "./pages/marketplace.jsx";
import { ProviderProfile } from "./pages/provider-profile.jsx";
import { AIVehicleInspection } from "./pages/ai-vehicle-inspection.jsx";
import { AIDiagnosticReport } from "./pages/ai-diagnostic-report.jsx";
import { UserDashboard } from "./pages/user-dashboard.jsx";
import { MyGarage } from "./pages/my-garage.jsx";
import { VehicleHistory } from "./pages/vehicle-history.jsx";
import { MaintenanceReminders } from "./pages/maintenance-reminders.jsx";
import { BookingFlow } from "./pages/booking-flow.jsx";
import { Community } from "./pages/community.jsx";
import { BecomePartner } from "./pages/become-partner.jsx";
import { PartnerDashboard } from "./pages/partner-dashboard.jsx";
import { AdminDashboard } from "./pages/admin-dashboard.jsx";
const router = createBrowserRouter([
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
      { path: "admin", Component: AdminDashboard }
    ]
  }
]);
export {
  router
};
