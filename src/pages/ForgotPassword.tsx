import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { forgotPassword } from "../reducers/authReducer";
import { Mail, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const result = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(result)) {
      setMessage("Password reset link sent! Check your email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1D3557] to-[#1D3557]/90 flex flex-col items-center justify-center">
      <div className="w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <KeyRound className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl font-bold text-blue">
            Forgot Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 opacity-50" size={21} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="flex justify-center mt-4 text-sm text-blue">
          <p className="mr-1">Remembered your password?</p>
          <Link to="/login" className="text-green">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
