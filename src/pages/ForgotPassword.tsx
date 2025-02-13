import { LockKeyhole, Lock, Mail, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1D3557] to-[#1D3557]/90 flex flex-col items-center justify-center">
    <div className="w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71] transform transition-all duration-500 hover:scale-105">
      <div className="flex flex-col gap-1 items-center mb-8">
          <KeyRound className="text-blue mb-2" size={30}/>
          <h2 className="text-2xl md:text-3xl font-bold text-blue">Reset Password</h2>
      </div>
      <form className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 opacity-50" size={21} />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
          />
        </div>
        <div className="relative">
            <Lock className="absolute left-3 top-3 opacity-50" size={20}/>
          <input
            type="password"
            placeholder="New password"
            className="sign-up-input"
          />
          </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3 opacity-50" size={21}/>
          <input
            type="password"
            placeholder="Re-enter new password"
            className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#2ECC71] text-white p-2 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
        >
          Reset
        </button>
      </form>
      <div className="flex justify-center mt-4 text-sm text-blue">
          <p className="mr-1">Remembered your password?</p><Link to="/login" className="text-green">Log In</Link>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword