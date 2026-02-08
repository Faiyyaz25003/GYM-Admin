
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  UserCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Registration() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ API Integrated Submit (UI SAME)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
        { headers: { "Content-Type": "application/json" } },
      );

      setSuccess(res.data.message || "Registered successfully! Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="relative flex-1 flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
            className="w-full h-full object-cover"
            alt="bg"
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full max-w-lg px-6 my-12">
          <div className="bg-gray-900/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-white/10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <UserCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400">
                Join us today and start your journey
              </p>
            </div>

            {/* Error / Success */}
            {error && (
              <div className="bg-red-600/20 border border-red-500 p-3 rounded-lg mb-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-600/20 border border-green-500 p-3 rounded-lg mb-4 text-green-300 text-sm">
                {success}
              </div>
            )}

            {/* FORM */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              />

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold ${
                  isLoading
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
