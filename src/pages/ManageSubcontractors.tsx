import { MdDelete, MdSearch } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import AssignSubcontractorProject from "../components/AssignSubcontractorProject";
import AddSubcontractor from "../components/AddSubContractor";

const subcontractors = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    projects: ["City Tower", "Westside Mall"],
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(987) 654-3210",
    projects: ["Harbor Bridge"],
  },
  {
    name: "Robert Johnson",
    role: "Plumbing",
    email: "robert.j@example.com",
    phone: "(567) 890-1234",
    projects: ["City Tower", "Harbor Bridge", "Westside Mall"],
  },
  {
    name: "Maria Williams",
    role: "Interior Design",
    email: "maria.w@example.com",
    phone: "(345) 678-9012",
    projects: [],
  },
];

const ManageSubcontractors = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Subcontractor Management
            </h1>
            <p className="text-gray-600">
              Manage and assign projects to subcontractors
            </p>
          </div>
          <div>
            <Sidebar />
          </div>
        </header>
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdSearch />
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Search subcontractors..."
            />
          </div>
          <AddSubcontractor />
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="blue text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Projects Assigned
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subcontractors.map((subcontractor, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {subcontractor.name}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {subcontractor.email}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {subcontractor.phone}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {subcontractor.projects.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {subcontractor.projects.map((project, idx) => (
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
                    <AssignSubcontractorProject onClose={() => {}} onSave={() => {}} />
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

export default ManageSubcontractors;
