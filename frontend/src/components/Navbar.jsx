import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Users, MessageSquare, User, Wind, LogOut, SearchCheck } from "lucide-react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  console.log(user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Community", path: "/community", icon: Users },
    { name: "Explore", path: "/explore", icon: SearchCheck},
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Wind className="h-8 w-8 text-white mr-2" />
            <span className="text-2xl font-bold text-white">Airify</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                );
              })}

              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white flex items-center gap-2"
                  >
                    <User size={16} />
                    {user.name}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg text-sm">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2 inline" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <User size={16} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
