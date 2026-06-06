import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/navbar.jsx";
function RootLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  return <div className="min-h-screen">
      <Navbar transparent={isLandingPage} />
      <Outlet />
    </div>;
}
export {
  RootLayout
};
