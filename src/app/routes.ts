import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import RegulatoryDashboard from "./pages/RegulatoryDashboard";

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
