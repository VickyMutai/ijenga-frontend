import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-[#1D3557] hover:bg-[#14253d] text-white px-4 py-2 mb-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
    >
      <ArrowLeft size={18} />
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;
