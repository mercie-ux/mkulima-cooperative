import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Leaf, User, LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-[#f9f7f3] shadow-md">
        <button onClick={() => setIsOpen(true)} className=" text-green-600 bg-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#f9f7f3] flex flex-col justify-between shadow-md z-40
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Header with close button on mobile */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 md:hidden">
          <h1 className="text-xl font-Heading font-bold text-gray-800">Coop Farm Hub</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            <X size={28} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-4">
          <Link
            to="/dashboard"
            className="flex items-center font-Heading gap-2 p-2 rounded-lg hover:bg-green-100 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/mycrops"
            className="flex items-center gap-2 font-Heading p-2 rounded-lg hover:bg-green-100 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <Leaf size={20} />
            My Crops
          </Link>
          <Link
            to="/profile"
            className="flex items-center font-Heading gap-2 p-2 rounded-lg hover:bg-green-100 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} />
            Profile
          </Link>
        </nav>

        {/* Logout */}
        <div className="px-4 mb-4">
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="flex items-center font-body gap-2 bg-green-600 text-yellow-50 w-full justify-center p-2 rounded-lg border-green-500 hover:bg-yellow-400 hover:text-gray-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
