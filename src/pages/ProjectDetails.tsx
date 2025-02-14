import { useNavigate } from "react-router-dom";
import { CirclePlus, FileText, MapPin } from "lucide-react";
import { MdApartment, MdEngineering } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import EditProjectDetails from "../components/EditProjectDetails";

export default function ProjectDetails() {
  const navigate = useNavigate();

  // Example project data (fetch this from the backend using the project ID)
  const project = {
    id: 1,
    projectName: "Project Alpha",
    projectLocation: "Nairobi",
    projectDescription: "Construction of a commercial building",
    supervisorContractor: "John Doe",
    supervisorConsultant: "Jane Smith",
    subcontractor: "ABC Construction",
  };

  // Example subcontracted works data (fetch this from the backend)
  const subcontractedWorks = [
    {
      id: 1,
      subcontractor: "XYZ Builders",
      laborer: "James Brown",
      amountAllocated: 50000,
    },
    {
      id: 2,
      subcontractor: "PQR Contractors",
      laborer: "Mary Johnson",
      amountAllocated: 75000,
    },
  ];


  const handleRowClick = (subcontractedWorksId: number) => {
    navigate(`/subcontracted-works-details/${subcontractedWorksId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Details</h1>
      </header>

      {/* Project Details Section */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue mb-4">
          {project.projectName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Location</p>
              <p className="text-lg font-semibold">{project.projectLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Description</p>
              <p className="text-lg font-semibold">
                {project.projectDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdEngineering size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Contractor</p>
              <p className="text-lg font-semibold">
                {project.supervisorContractor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <BiSupport size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Consultant</p>
              <p className="text-lg font-semibold">
                {project.supervisorConsultant}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdApartment size={27} />
            <div>
              <p className="text-sm text-gray-500">Sub-Contractor</p>
              <p className="text-lg font-semibold">{project.subcontractor}</p>
            </div>
          </div>
        </div>

        {/* Edit Project Button */}
        <div className="mt-6 flex space-x-4">
          <EditProjectDetails />
        </div>
      </div>

      {/* Subcontracted Works Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue mb-4">
            Subcontracted Works
          </h2>
          <CirclePlus
            className="text-blue cursor-pointer hover:scale-105"
            size={28}
          />
        </div>
        <div className="overflow-x-auto rounded-lg shadow-md mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="blue text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Subcontractor
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Laborer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Amount Allocated
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subcontractedWorks.map((work) => (
                <tr
                  key={work.id}
                  className="hover:bg-gray-100 transition duration-200 cursor-pointer"
                  onClick={() => handleRowClick(work.id)}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {work.subcontractor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {work.laborer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Ksh. {work.amountAllocated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex gap-4">
                      {/* View Button */}
                      <button
                        className="text-secondary hover:text-green-600 transition duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(work.id);
                        }}
                      >
                        <FaEye className="w-5 h-5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        className="text-primary hover:text-blue-800 transition duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(project.id);
                        }}
                      >
                        <FaPencilAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
