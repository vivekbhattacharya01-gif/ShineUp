import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <main className={isLanding ? "" : "pt-20"}>
        <Outlet />
      </main>
    </div>
  );
}
