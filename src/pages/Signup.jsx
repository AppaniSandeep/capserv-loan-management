import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import usersData from "../data/users";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSignup = () => {
    const { name, email, password, phone, city } = form;

    if (!name || !email || !password || !phone || !city) {
      toast.error("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || usersData;

    if (users.find((u) => u.email === email)) {
      toast.error("Email already exists");
      return;
    }

    users.push({
      id: Date.now(),
      name,
      email,
      password,
      otp: "111222",
      phone,
      city,
    });

    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Signup successful");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Signup
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="tel"
            placeholder="Phone"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="text"
            placeholder="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          onClick={handleSignup}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
