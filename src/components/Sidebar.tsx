import { useState } from "react";
import { Menu, BrickWall, Building, HomeIcon, LogOut, X} from "lucide-react";
import { useAppDispatch } from "../reducers/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/authReducer";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 bg-gray-200 rounded-lg transition-colors z-50 cursor-pointer"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-between">
        <button
            onClick={closeSidebar}
            className="absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} /> {/* Close icon */}
          </button>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-blue mt-16">Menu</h2>
            <ul className="mt-10 space-y-4">
              <li>
                <Link to="/home" onClick={closeSidebar} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all transform hover:translate-x-2 cursor-pointer">
                    <HomeIcon className="text-blue" />
                    <span className="ml-2 font-semibold text-blue">Home</span>
                </Link>
              </li>
              <li>
              <Link to="/home" onClick={closeSidebar} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all transform hover:translate-x-2 cursor-pointer">
                <Building className="text-blue"/>
                <span className="ml-2 font-semibold text-blue">Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/subcontracted-works-details/:projectId/:id" className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all transform hover:translate-x-2 cursor-pointer">
                <BrickWall className="text-blue"/>
                <span className="ml-2 font-semibold text-blue">Subcontracted Works</span>
                </Link>
              </li>
              <ProfileModal />
            </ul>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div
              onClick={handleLogout}
              className="flex gap-2 items-center justify-center bg-gray-300 rounded-full p-3 cursor-pointer hover:bg-gray-400 transition-colors"
            >
              <p className="text-blue font-semibold">Logout</p>
              <LogOut />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}