import { RouterProvider } from "react-router";
import { router } from "./routes.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
function App() {
  return <>
      <RouterProvider router={router} />
      <Toaster />
    </>;
}
export {
  App as default
};
