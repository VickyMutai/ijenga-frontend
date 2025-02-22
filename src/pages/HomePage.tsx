import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../reducers/store";
// import { LogOut } from "lucide-react";
import { IoWallet } from "react-icons/io5";
import Avatar from "../components/Avatar";
import CreateProjectModal from "../components/CreateProjectModal";
import ProjectsTable from "../components/ProjectsTable";
import { fetchUserProfile } from "../reducers/authReducer";
import { fetchProjects } from "../reducers/projectReducer";
//import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();

  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);

  const { user, loading: userLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]); 

  if (userLoading || projectsLoading) return <Loader />;

  if (!user) return <p>No user data found</p>;

  const fullName = `${user.first_name} ${user.last_name}`;

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/");
  // };

  // Example wallet balance
  const walletBalance = 2500.75;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-blue py-4 md:px-6 flex items-center justify-between">
          {/* <Sidebar /> */}
          <div className="flex items-center gap-2">
          <Avatar name={fullName} size={12} />
          <div className="text-left">
            <p className="text-lg font-semibold">Welcome, {fullName}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role.replace("-", " ")}</p>
          </div>
          </div>
          <div>
            <Sidebar />
          </div>
          
        {/* <div
          onClick={handleLogout}
          className="bg-gray-300 rounded-full md:px-4 p-3 flex gap-2 cursor-pointer hover:bg-gray-400 transition-colors"
        >
          <p className="text-blue font-semibold hidden md:block">Logout</p>
          <LogOut />
        </div> */}
      </header>
      {user.role === "main-contractor" && 
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance Section */}
        {user.role === "main-contractor" && (
          <div className="flex flex-col gap-2 py-7 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-400 rounded-xl shadow-md">
            <div className="flex gap-3">
              <IoWallet className="text-white" size={30} />
              <h2 className="text-2xl font-semibold text-white">Wallet Balance</h2>
            </div>
            <p className="text-3xl font-bold text-green-400 mt-2">
              Ksh. {walletBalance.toLocaleString()}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue">Projects Categories</h2>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-between w-full gap-2 py-2 px-4 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-800 text-base">Active Projects</span>
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-base">12</span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 py-2 px-4 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-800 text-base">Completed Projects</span>
              <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-base">24</span>
            </div>
          </div>
        </div>
      </div>
      }

      {/* Projects Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue">My Projects</h2>
          {user.role === "main-contractor" && <CreateProjectModal />}
        </div>
        <div className="mt-4">
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </div>
  );
}
