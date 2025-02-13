import { UserRound, UserRoundPlus, Mail, LockKeyhole, Lock, Phone, HardHat } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1D3557] to-[#1D3557]/90 flex flex-col items-center justify-center">
      <div className="w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <UserRoundPlus className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl font-bold text-blue">Sign Up</h2>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative">
              <UserRound
                className="absolute left-3 top-3 opacity-50"
                size={20}
              />
              <input
                type="text"
                placeholder="First Name"
                className="sign-up-input"
              />
            </div>

            <div className="relative">
              <UserRound
                className="absolute left-3 top-3 opacity-50"
                size={20}
              />
            <input
              type="text"
              placeholder="Last Name"
              className="sign-up-input"
            />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 opacity-50" size={20} />
          <input type="email" placeholder="Email" className="sign-up-input" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 opacity-50" size={21}/>
          <input type="tel" placeholder="Phone" className="sign-up-input" />
          </div>
          <div className="relative">
            <HardHat className="absolute left-3 top-3 opacity-50" size={21}/>
          <select className="sign-up-input pr-2">
            <option value="">Select Role</option>
            <option value="">Main Contractor</option>
            <option value="">Supervisor Contractor</option>
            <option value="">Supervisor Consultant</option>
            <option value="">Subcontractor</option>
          </select>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 opacity-50" size={20}/>
          <input
            type="password"
            placeholder="Password"
            className="sign-up-input"
          />
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3 opacity-50" size={20}/>
          <input
            type="password"
            placeholder="Re-enter Password"
            className="sign-up-input"
          />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center mt-4 text-sm text-blue">
            <p className="mr-1">Already have an account?</p><Link to="/login" className="text-green">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
