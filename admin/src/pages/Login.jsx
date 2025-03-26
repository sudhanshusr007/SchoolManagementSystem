import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    let newErrors = {};

    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.password) newErrors.password = "Password is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Section - Branding */}
      <div className="w-7/10 bg-blue-500 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-bold mb-4">Admin Panel</h1>
        <p className="text-lg text-center max-w-lg">
          Manage school operations efficiently with Kids Corner Admin Panel.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-3/10 bg-white flex flex-col justify-center items-center p-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Admin Login</h2>

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className={`w-full border rounded-md py-2 px-3 outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="admin@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="w-full mb-4">
          <label className="block font-medium mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full border rounded-md py-2 pl-12 pr-10 outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="************"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-blue-400" />
              ) : (
                <Eye className="size-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
