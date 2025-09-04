import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Farmers", path: "/admin/farmers" },
  { name: "Crops", path: "/admin/crops" },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/");
  }

  return (
    <div className="flex">
      {/* Mobile menu button */}
      <div className="md:hidden">
        <p
          onClick={() => setOpen(!open)}
          className="text-green-500  focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </p>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="flex flex-col  font-body space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 text-white py-2 rounded-md ${
                  location.pathname === item.path
                    ? "bg-green-900"
                    : "hover:bg-yellow-200"
                } transition`}
              >
                {item.name}
              </Link>
            ))}
            {/*Logout button */}
            <div className="p-6">
                <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full bg-green-600 text-white hover:bg-yellow-300 py-2 rounded-md font-semibold transition mt-28"
                >
                    <LogOut className="mr-2 h-4 w-4"/>
                    Logout
                </button>
            </div>
          </nav>
        </div>
      </div>
      

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-green-500 bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Page content */}
      <div className="flex-1 md:ml-64 p-6">{/* Your admin pages here */}</div>
    </div>
  );
}
