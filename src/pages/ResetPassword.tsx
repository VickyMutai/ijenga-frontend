import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../reducers/store";
import { resetPassword } from "../reducers/authReducer";
import { LockKeyhole, Lock, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [searchParams] = useSearchParams(); // Extracts query params
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userIdParam = searchParams.get("user_id");
    const tokenParam = searchParams.get("token");

    if (userIdParam && tokenParam) {
      setUserId(userIdParam);
      setToken(tokenParam);
    } else {
      setMessage("❌ Invalid password reset link!");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    const result = await dispatch(resetPassword({ user_id: userId, token, new_password: password, re_enter_password: confirmPassword }));

    if (resetPassword.fulfilled.match(result)) {
      setMessage("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1D3557] to-[#1D3557]/90 flex flex-col items-center justify-center">
      <div className="w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <KeyRound className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl font-bold text-blue">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 opacity-50" size={20} />
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              required
            />
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3 opacity-50" size={21} />
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#2ECC71] text-white p-2 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
