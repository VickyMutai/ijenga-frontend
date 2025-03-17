import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchUserProfile } from "../reducers/authReducer";
import { Mail, Phone, UserRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);
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

          {loading ? (
            <p className="text-center text-[#1D3557]">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-1 text-[#1D3557]">
                  {user?.first_name } {user?.last_name}
                </h2>
                <p className="text-[#1D3557]/80 text-sm capitalize">
                  {user?.role || "N/A"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2 items-center p-3 bg-[#2ECC71]/20 rounded-lg backdrop-blur-sm border border-[#2ECC71]/40 hover:bg-[#2ECC71]/30 transition-all duration-200">
                  <Mail className="text-[#1D3557]" />
                  <p className="text-sm text-[#1D3557]/90">
                    {user?.email || "No email available"}
                  </p>
                </div>

                <div className="flex gap-2 items-center p-3 bg-[#2ECC71]/20 rounded-lg backdrop-blur-sm border border-[#2ECC71]/40 hover:bg-[#2ECC71]/30 transition-all duration-200">
                  <Phone className="text-[#1D3557]" />
                  <p className="text-sm text-[#1D3557]/90">
                    {user?.phone_number || "No phone available"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
