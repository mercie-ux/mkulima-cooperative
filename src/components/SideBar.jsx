import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Leaf, User, LogOut, } from "lucide-react";

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <section className="h-screen w-64 bg-[#f9f7f3] flex flex-col justify-between shadow-md">
            {/*Header*/}
            <div>
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-Heading font-bold text-gray-800">Coop Farm Hub</h1>
                    <p className="text-sm text-gray-500">Farmer</p>
                </div>
                <nav className="mt-6 flex flex-col gap-2 px-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center font-Heading gap-2 p-2 rounded-lg hover:bg-green-100 text-gray-700"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        to="/mycrops"
                        className="flex items-center gap-2 font-Heading p-2 rounded-lg hover:bg-green-100 text-gray-700"
                    >
                        <Leaf size={20}/>
                        My Crops
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center font-Heading gap-2 p-2 rounded-lg hover:bg-green-100 text-gray-700"
                    >
                        <User size={20}/>
                        Profile
                    </Link>
                </nav>
            </div>

            {/*Logout */}
            <div>
                <button
                    onClick={handleLogout}
                    className="flex items-center font-body gap-2 bg-green-600 text-yellow-50 border-green-500 hover:bg-yellow-400 hover:text-gray-700"
                >
                    <LogOut size={20}/>
                    Logout
                </button>
            </div>
        </section>
    );
};
export default Sidebar;