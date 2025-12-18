import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import usersData from "../data/users";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [step, setStep] = useState("LOGIN"); // LOGIN | OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [tempUser, setTempUser] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || usersData;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    setTempUser(user);
    setStep("OTP");
    toast.success("OTP sent successfully");
  };

  const handleOtpVerify = () => {
    if (otp !== tempUser.otp) {
      toast.error("Invalid OTP");
      return;
    }

    login(tempUser);
    toast.success("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {step === "LOGIN" ? "Login" : "Verify OTP"}
        </h2>

        {step === "LOGIN" ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              Login
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:underline"
              >
                Signup
              </Link>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-center tracking-widest focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <button
              onClick={handleOtpVerify}
              className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
