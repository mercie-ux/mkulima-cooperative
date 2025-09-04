import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { post } from "../utils/api";

const AuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = await post(endpoint, formData);

      if(!isLogin) {
        //Registration success
        setSuccessMessage(data.message || "Registration successful!");
        // clears form
        setFormData({ name: "", email: "", password: "", role: "farmer" });
        // Countdown redirect
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setLogin(true); // switch to login form
              setSuccessMessage(""); // clear message
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setLoading(false);
        return;
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      };

      login(userData);

      // Redirect based on role
      navigate(userData.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickLogin = async () => {
    try {
      setLoading(true);
      const data = await post("/auth/login", {
        email: "admin@coop.com",
        password: "admin123",
      });

      localStorage.setItem("token", data.token);

      login(data.user);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-body flex-col items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Login to your Account" : "Create a New Account"}
          </h2>

          {error && (
            <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
          )}
            {successMessage && (
              <p className="text-green-600 text-center mb-4 text-sm">
                {successMessage} Redirectin to login in {countdown}...
              </p>
            )}
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
                    <option value="admin">Admin</option>
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

            <div className="relative">
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full bg-slate-50 border border-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                required
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 -bottom-1/4 transform -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                {showPassword ? "Hide" : "Show"}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-4 rounded-md font-semibold text-base sm:text-lg transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-3">
              <span className="text-sm sm:text-base">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <button
                onClick={() => setLogin(!isLogin)}
                className="bg-slate-50 border border-green-600 text-green-600 font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition text-sm sm:text-base"
              >
                {isLogin ? "Create Account" : "Login"}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-green-600 hover:underline focus:outline-none"
              >
                 Forgot Password?
              </Link>
            </div>

                {/*Admin login */}
            <button
              onClick={handleAdminQuickLogin}
              disabled={loading}
              className="mb-6 mt-6 bg-green-700 border border-green-600 text-white px-6 py-2 rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {loading ? "Logging in..." : "Login as Admin"}
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
