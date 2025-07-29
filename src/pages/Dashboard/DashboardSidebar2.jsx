import { useQuery } from "@tanstack/react-query";

import { Link, NavLink, useNavigate } from "react-router";
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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";

const DashboardSidebar2 = () => {
  const axiosSecure = useAxiosSecure();
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user info from backend
  const { data: roleData, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosSecure.get("/me");
      console.log(res.data);
      return res.data;
    },
  });

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  if (isLoading || !user) {
    return (
      <aside className="w-72 min-h-screen flex items-center justify-center">
        <Loading />
      </aside>
    );
  }

  // Only admins can see admin links!
  const isAdmin = roleData.role === "admin";
  const isModerator = roleData.role === "moderator";

  return (
    <aside className="w-72 min-h-screen bg-base-200 text-amber-50 border-r flex flex-col justify-between p-4">
      <div>
        <Link to={"/"}>
          <h3 className="text-2xl font-bold text-cyan-700 mb-6">Dashboard</h3>
        </Link>
        <nav className="flex flex-col gap-1">
          {/* All users */}
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaUser /> My Profile
          </NavLink>
          <NavLink
            to="/dashboard/add-product"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaPlus /> Add Product
          </NavLink>
          <NavLink
            to="/dashboard/my-products"
            className={({ isActive }) =>
              isActive
                ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
            }
          >
            <FaList /> My Products
          </NavLink>
          {/* Moderator and Admin */}
          {(isModerator || isAdmin) && (
            <>
              <NavLink
                to="/dashboard/review-queue"
                className={({ isActive }) =>
                  isActive
                    ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
                }
              >
                <FaClipboardCheck /> Product Review Queue
              </NavLink>
              <NavLink
                to="/dashboard/reported-contents"
                className={({ isActive }) =>
                  isActive
                    ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
                }
              >
                <FaBug /> Reported Contents
              </NavLink>
            </>
          )}
          {/* Admin only links */}
          {isAdmin && (
            <>
              <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
                }
              >
                <FaUsers /> Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/manage-coupons"
                className={({ isActive }) =>
                  isActive
                    ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
                }
              >
                <FaTag /> Manage Coupons
              </NavLink>
              <NavLink
                to="/dashboard/statistics"
                className={({ isActive }) =>
                  isActive
                    ? "bg-cyan-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    : "hover:bg-cyan-50 text-gray-500 rounded-lg px-4 py-2 flex items-center gap-2"
                }
              >
                <FaChartPie /> Statistics
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-2">
        <img
          src={user?.photoURL}
          alt={user.name || "User"}
          className="w-14 h-14 rounded-full border-2 border-cyan-300 object-cover"
        />
        <span className="font-semibold text-cyan-700">{user.name}</span>
        <span className="text-xs bg-cyan-100 px-2 py-1 rounded mt-1 text-cyan-600 font-bold uppercase tracking-wide">
          {roleData.role}
        </span>
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

export default DashboardSidebar2;
