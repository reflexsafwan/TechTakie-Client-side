import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar";

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-base-200">
    {/* Sidebar always on the left */}
    <DashboardSidebar />
    {/* Main content: fills right side */}
    <div className="flex-1 flex items-center justify-center p-6">
      {/* Outlet will render the card that fills most of the right side */}
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
