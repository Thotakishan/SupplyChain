import { createBrowserRouter } from "react-router";
import Login from "./pages/Login.jsx";
import ManufacturerDashboard from "./pages/ManufacturerDashboard.jsx";
import DistributorDashboard from "./pages/DistributorDashboard.jsx";
import RetailerDashboard from "./pages/RetailerDashboard.jsx";
import RegulatoryDashboard from "./pages/RegulatoryDashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/manufacturer",
    Component: ManufacturerDashboard,
  },
  {
    path: "/distributor",
    Component: DistributorDashboard,
  },
  {
    path: "/retailer",
    Component: RetailerDashboard,
  },
  {
    path: "/regulatory",
    Component: RegulatoryDashboard,
  },
]);
