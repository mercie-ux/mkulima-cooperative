import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer", // default role
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
    // Determine role based on email or formData.role (for testing)
    const role = formData.email.includes("admin") || formData.role === "admin" ? "admin" : "farmer";

    // Mock user object
    const mockUser = {
      id: role === "admin" ? 0 : 1,
      name: formData.name || (role === "admin" ? "Admin Test" : "User"),
      email: formData.email,
      role,
    };

    // Log in and navigate based on role
    login(mockUser);
    navigate(role === "admin" ? "/admin" : "/dashboard");
    } else {
      // For Sign Up
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role, // use selected role
      };

      login(newUser);
      navigate(formData.role === "admin" ? "/admin" : "/dashboard");
    }
  };

  // Quick Admin Login handler
  const handleAdminQuickLogin = () => {
    const adminUser = { id: 0, name: "Admin Test", email: "admin@test.com", role: "admin" };
    login(adminUser);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Login to your Account" : "Create a New Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="admin">Admin (for testing)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full bg-slate-50 border border-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-4 rounded-md font-semibold text-base sm:text-lg transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-3">
              <span className="text-sm sm:text-base">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button
                onClick={() => setLogin(!isLogin)}
                className="bg-slate-50 border border-green-600 text-green-600 font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition text-sm sm:text-base"
              >
                {isLogin ? "Create Account" : "Login"}
              </button>
            </div>
             {/* Admin Login Button */}
            <button
              onClick={handleAdminQuickLogin}
              className="mb-6 mt-6 bg-green-700 border border-green-600 text-white px-6 py-2 rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login as Admin
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-green-600 font-semibold hover:underline focus:outline-none text-sm sm:text-base inline-flex items-center"
            >
              <span className="mr-1">&larr;</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
