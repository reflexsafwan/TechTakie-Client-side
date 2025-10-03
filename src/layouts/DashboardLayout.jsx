import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar";
import DashboardSidebar2 from "../pages/Dashboard/DashboardSidebar2";
import Navbar from "./../components/Navbar/Navbar";
import Container from "../components/Container";

const DashboardLayout = () => (
  <div className="flex  bg-base-200">
    {/* Sidebar always on the left */}
    {/* <DashboardSidebar /> */}
    <div className="w-sm">
      <DashboardSidebar2></DashboardSidebar2>
    </div>
    {/* Main content: fills right side */}

    <div className=" w-[calc(100%_-_384px)]">
        <Navbar></Navbar>
      {/* Outlet will render the card that fills most of the right side */}
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
