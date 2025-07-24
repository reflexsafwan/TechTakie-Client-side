// src/components/DashboardSidebar.jsx
import { useContext } from "react";

import { NavLink, useNavigate } from "react-router";
import {
  FaUser,
  FaPlus,
  FaList,
  FaClipboardCheck,
  FaBug,
  FaChartPie,
  FaUsers,
  FaTag,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const DashboardSidebar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-base-100 border-r flex flex-col justify-between p-4">
      <div>
        <h3 className="text-2xl font-bold text-cyan-700 mb-6">Dashboard</h3>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaUser />
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/add-product"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaPlus />
            Add Product
          </NavLink>
          <NavLink
            to="/dashboard/my-products"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaList />
            My Products
          </NavLink>
          <NavLink
            to="/dashboard/review-queue"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaClipboardCheck />
            Product Review Queue
          </NavLink>
          <NavLink
            to="/dashboard/reported-contents"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaBug />
            Reported Contents
          </NavLink>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaChartPie />
            Statistics
          </NavLink>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaUsers />
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/manage-coupons"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaTag />
            Manage Coupons
          </NavLink>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-2">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt={user?.name || "User"}
          className="w-14 h-14 rounded-full border-2 border-cyan-300 object-cover"
        />
        <span className="font-semibold text-cyan-700">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error btn-sm w-full flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
