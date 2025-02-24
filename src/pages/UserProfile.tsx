import { Mail, Phone, Trash, UserRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1D3557]/10">
      {/* Go Back Link */}
      <div className="w-[300px] md:w-[400px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1D3557] hover:text-[#2ECC71] transition-all duration-200 mb-4 cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </button>
      </div>

      <div className="w-[300px] md:w-[400px] backdrop-blur-xl bg-white rounded-xl shadow-lg border border-[#1D3557]/40 overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557]/30 to-[#2ECC71]/30 pointer-events-none" />

          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1D3557]/80 to-[#2ECC71]/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <UserRound className="text-white size-9" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1 text-[#1D3557]">
              John Davidson
            </h2>
            <p className="text-[#1D3557]/80 text-sm">Main Contractor</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 items-center p-3 bg-[#2ECC71]/20 rounded-lg backdrop-blur-sm border border-[#2ECC71]/40 hover:bg-[#2ECC71]/30 transition-all duration-200">
              <Mail className="text-[#1D3557]" />
              <p className="text-sm text-[#1D3557]/90">
                john.davidson@company.com
              </p>
            </div>

            <div className="flex gap-2 items-center p-3 bg-[#2ECC71]/20 rounded-lg backdrop-blur-sm border border-[#2ECC71]/40 hover:bg-[#2ECC71]/30 transition-all duration-200">
              <Phone className="text-[#1D3557]" />
              <p className="text-sm text-[#1D3557]/90">0712345678</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full py-3 px-4 bg-[#28B965] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#67b186] transition-all duration-200 border border-[#2ECC71]/40 cursor-pointer">
              <Trash />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
