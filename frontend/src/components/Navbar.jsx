import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaRobot,
  FaUserCircle,
  FaFileUpload,
} from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineSavings,
  MdAdminPanelSettings,
} from "react-icons/md";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const active = (path) =>
    location.pathname === path
      ? "text-cyan-400"
      : "text-white hover:text-cyan-300 transition";

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 text-white"
        >
          <span className="text-4xl">🏛️</span>

          <div>

            <h1 className="text-2xl font-black">
              SmartGov
            </h1>

            <p className="text-xs text-slate-300">
              AI Scheme Recommendation
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-8 font-semibold">

          <Link
            className={active("/")}
            to="/"
          >
            <span className="flex items-center gap-2">
              <FaHome />
              Home
            </span>
          </Link>

          <Link
            className={active("/recommend")}
            to="/recommend"
          >
            🔍 Schemes
          </Link>

          <Link
            className={active("/dashboard")}
            to="/dashboard"
          >
            <span className="flex items-center gap-2">
              <MdDashboard />
              Dashboard
            </span>
          </Link>

          <Link
            className={active("/saved")}
            to="/saved"
          >
            <span className="flex items-center gap-2">
              <MdOutlineSavings />
              Saved
            </span>
          </Link>

          <Link
            className={active("/chat")}
            to="/chat"
          >
            <span className="flex items-center gap-2">
              <FaRobot />
              Smart AI
            </span>
          </Link>

          {/* NEW */}

          <Link
            className={active("/verify-document")}
            to="/verify-document"
          >
            <span className="flex items-center gap-2">
              <FaFileUpload />
              Verify Docs
            </span>
          </Link>

          {/* Show Admin only for admin */}

          {user?.role === "admin" && (
            <Link
              className={active("/admin")}
              to="/admin"
            >
              <span className="flex items-center gap-2">
                <MdAdminPanelSettings />
                Admin
              </span>
            </Link>
          )}

        </div>

        {/* Right Side */}

        {user ? (
          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2 text-white">

              <FaUserCircle size={26} />

              <div>

                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-xs text-slate-400">
                  {user.email}
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl text-white font-semibold"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl text-white font-semibold"
          >
            Login
          </Link>
        )}

      </div>
    </motion.nav>
  );
}

export default Navbar;