import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar";
import DashboardSidebar2 from "../pages/Dashboard/DashboardSidebar2";

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-base-200">
    {/* Sidebar always on the left */}
    {/* <DashboardSidebar /> */}
    <DashboardSidebar2></DashboardSidebar2>
    {/* Main content: fills right side */}
    <div className=" flex flex-1 ">
      {/* Outlet will render the card that fills most of the right side */}
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
