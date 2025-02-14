import { FaEye, FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  projectName: string;
  projectLocation: string;
  projectDescription: string;
  supervisorContractor: string;
  supervisorConsultant: string;
  subcontractor: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="blue text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Location
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Supervisor Contractor
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Supervisor Consultant
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Subcontractor
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {projects.map((project, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-200">
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectLocation}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectDescription}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.supervisorContractor}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.supervisorConsultant}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.subcontractor}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-4">
                  {/* View Button */}
                  <button
                    className="text-secondary hover:text-green-600 transition duration-200 cursor-pointer"
                    onClick={() => navigate("/project-details")}
                  >
                    <FaEye className="w-5 h-5" />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="text-primary hover:text-blue-800 transition duration-200 cursor-pointer"
                    onClick={() => {}}
                  >
                    <FaPencilAlt className="w-5 h-5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="text-primary hover:text-red-600 transition duration-200 cursor-pointer"
                    onClick={() => {}}
                  >
                    <FaTrashCan className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}