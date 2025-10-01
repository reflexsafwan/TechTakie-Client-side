// import { useContext } from "react";
import TechieTakeLogo from "../TechieTakeLogo";
import useAuth from "./../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const activeLink =
  "btn btn-ghost text-base font-semibold text-cyan-600 underline underline-offset-8";
const normalLink = "btn btn-ghost text-base";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-3 md:px-8 sticky top-0 z-100">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <TechieTakeLogo />
        </Link>
      </div>

      {/* Center: Nav links */}
      <div className="navbar-center hidden md:flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Products
        </NavLink>
      </div>

      {/* Right: Auth Buttons / User Profile */}
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn btn-outline btn-primary btn-sm rounded-lg"
            >
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm rounded-lg">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-cyan-200">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="User"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-200 rounded-box w-56"
            >
              <li>
                <span className="font-semibold text-cyan-600">{user.name}</span>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile menu (hamburger) */}
      <div className="md:hidden navbar-end">
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg width="24" height="24" fill="none" className="inline-block">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-semibold underline underline-offset-8"
                    : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-semibold underline underline-offset-8"
                    : ""
                }
              >
                Products
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="font-semibold">{user.name}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
