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

const {
  projects,
  loading: projectsLoading,
  walletBalance,
} = useSelector((state: RootState) => state.projects);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-blue py-4 md:px-6 flex items-center justify-between">
        {/* <Sidebar /> */}
        <div className="flex items-center gap-2">
          <Avatar name={fullName} size={12} />
          <div className="text-left">
            <p className="text-lg font-semibold">Welcome, {fullName}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.role.replace("-", " ")}
            </p>
          </div>
        </div>
        <div>
          <Sidebar />
        </div>
      </header>
      {user.role === "main-contractor" && (
        <div className="mt-6 flex justify-center">
          {/* Wallet Balance Section */}
          {user.role === "main-contractor" && (
            <div className="flex flex-col gap-2 py-7 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-400 rounded-xl shadow-md w-full max-w-md">
              <div className="flex gap-3">
                <IoWallet className="text-white" size={30} />
                <h2 className="text-2xl font-semibold text-white">
                  Wallet Balance
                </h2>
              </div>
              <p className="text-3xl font-bold text-green-400 mt-2">
                Ksh. {walletBalance.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
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
