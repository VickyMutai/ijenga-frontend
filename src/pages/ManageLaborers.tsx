import { MdDelete, MdSearch } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import AssignLaborerProject from "../components/AssignLaborerProject";

const laborers = [
  {
    name: "John Doe",
    id: "12345678",
    title: "mason",
    projects: ["City Tower", "Westside Mall"],
  },
  {
    name: "Jane Smith",
    id: "12345678",
    title: "artisan",
    projects: ["Harbor Bridge"],
  },
  {
    name: "Robert Johnson",
    id: "12345678",
    title: "mason",
    projects: ["City Tower", "Harbor Bridge", "Westside Mall"],
  },
  {
    name: "Maria Williams",
    id: "12345678",
    title: "mason",
    projects: [],
  },
];

const ManageLaborers = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold mb-2">Laborers Management</h1>
            <p className="text-gray-600">
              Manage and assign projects to laborers
            </p>
          </div>
          <div>
            <Sidebar />
          </div>
        </header>
        <div className="mb-4">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdSearch />
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Search laborer..."
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="blue text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  ID Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Project(s) Assigned
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {laborers.map((laborer, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {laborer.name}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {laborer.id}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700 capitalize">
                    {laborer.title}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {laborer.projects.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {laborer.projects.map((project, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {project}
                            </span>
                            <button className="text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                              <MdDelete size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-700 italic">
                        No Projects Assigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <AssignLaborerProject
                      onClose={() => {}}
                      onSave={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLaborers;
