import { FaRegBuilding } from "react-icons/fa";
import { UserRound, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen bg-gradient-to-br from-[#1D3557] to-[#1D3557]/90 p-4 lg:p-8 flex items-center justify-center">
        <main className="flex flex-col-reverse lg:flex-row items-center justify-center">
          {/* Left section */}
          <div className="text-center lg:text-left lg:w-1/2 px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-gradient">
              Welcome to <span className="text-[#2ECC71]">Ijenga</span> Portal
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Your gateway to simplify project workflows for construction
              companies.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => navigate("/login")} // Redirect to login page
                className="flex gap-1.5 items-center cursor-pointer px-6 py-3 text-white border-2 border-[#2ECC71] rounded-full hover:bg-[#2ECC71] transition-all duration-300 transform hover:scale-105"
              >
                <UserRound />
                <span className="font-medium text-[18px]">Login</span>
              </button>
              <button
                onClick={() => navigate("/signup")} // Redirect to signup page
                className="flex gap-1.5 items-center cursor-pointer px-6 py-3 bg-[#2ECC71] text-white rounded-full hover:bg-[#2ECC71]/90 transition-all duration-300 transform hover:scale-105"
              >
                <UserRoundPlus />
                <span className="font-medium text-[18px]">Sign Up</span>
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center">
              <FaRegBuilding className="text-[#2ECC71] text-8xl md:text-9xl transform transition-all duration-500 hover:scale-105 animate-float" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;