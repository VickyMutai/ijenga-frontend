import { FaRegBuilding } from "react-icons/fa";
import { UserRound, UserRoundPlus, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import ParticlesComponent from "../components/Particles";

const LandingPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token); // 🔍 Check if user is logged in

  return (
    <div>
      <ParticlesComponent id="particles" />
      <div className="max-h-screen md:h-screen p-4 lg:p-8 flex items-center justify-center">
        <main className="flex flex-col-reverse lg:flex-row items-center justify-center">
          {/* Left section */}
          <div className="text-center lg:text-left lg:w-1/2 px-4">
            <h2 className="text-[44px] md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-gradient">
              Welcome to <span className="text-[#2ECC71]">WIMPS</span> Portal
            </h2>
            <p className="text-gray-300 text-lg md:text-xl lg:text-xl mb-8">
              Your gateway to simplify project workflows for construction
              companies.
            </p>

            {/* 🔥 Show "Go to Home" if user is logged in */}
            {token ? (
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/home")}
                  className="flex gap-1.5 items-center px-[16px] md:px-6 py-3 bg-[#2ECC71] text-white rounded-full hover:bg-[#2ECC71]/90 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <Home />
                  <span className="font-medium text-[18px]">Go to Home</span>
                </button>
              </div>
            ) : (
              // Show Login and Signup buttons if user is not logged in
              <div className="flex justify-center lg:justify-start gap-6">
                <button
                  onClick={() => navigate("/login")}
                  className="flex gap-1.5 items-center px-[16px] md:px-6 py-3 text-white border-2 border-[#2ECC71] rounded-full hover:bg-[#2ECC71] transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <UserRound />
                  <span className="font-medium text-[18px]">Login</span>
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="flex gap-1.5 items-center px-[16px] md:px-6 py-3 bg-[#2ECC71] text-white rounded-full hover:bg-[#2ECC71]/90 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <UserRoundPlus />
                  <span className="font-medium text-[18px]">Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <div className="w-[230px] h-[230px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FaRegBuilding className="text-[#2ECC71] text-8xl md:text-9xl lg:text-[10rem]" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
