import { LogOut } from "lucide-react";
import { IoWallet } from "react-icons/io5";
import Avatar from "../components/Avatar";
import CreateProjectModal from "../components/CreateProjectModal";
import ProjectsTable from "../components/ProjectsTable";

export default function Home() {
  // User data (to be fetched from backend)
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "main-contractor",
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  // Wallet balance (to be fetched from backend)
  const walletBalance = 2500.75;

  // Example project data (to be fetched from backend)
  const projects = [
    {
      id: 1,
      projectName: "Project Alpha",
      projectLocation: "Nairobi",
      projectDescription: "Construction of a commercial building",
      supervisorContractor: "John Doe",
      supervisorConsultant: "Jane Smith",
      subcontractor: "ABC Construction",
    },
    {
      id: 2,
      projectName: "Project Beta",
      projectLocation: "Mombasa",
      projectDescription: "Road construction",
      supervisorContractor: "Mike Johnson",
      supervisorConsultant: "Sarah Lee",
      subcontractor: "XYZ Builders",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-blue py-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={fullName} size={12} />
          <div className="text-left">
            <p className="text-lg font-semibold">Welcome, {fullName}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.role.replace("-", " ")}
            </p>
          </div>
        </div>
        {/* Add signout functionality here */}
        <div className="bg-gray-300 rounded-full md:px-4 p-3 flex gap-2 cursor-pointer hover:bg-gray-400 transition-colors">
          <p className="text-blue font-semibold hidden md:block">Logout</p>
          <LogOut />
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance Section */}
        {user.role === "main-contractor" && (
          <div className="flex flex-col gap-2 py-7 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-400 rounded-xl shadow-md">
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue">
            Projects Categories
          </h2>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-between w-full gap-2 py-2 px-4 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-800 text-base">Active Projects</span>
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-base">
                12
              </span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 py-2 px-4 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-800 text-base">
                Completed Projects
              </span>
              <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-base">
                24
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue">Your Projects</h2>
          <CreateProjectModal />
        </div>
        <div className="mt-4">
          {/* Add dynamic project list here */}
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </div>
  );
}
